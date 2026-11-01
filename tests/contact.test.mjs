import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

function load(relative, dependencies = {}) {
  const source = fs.readFileSync(path.resolve(relative), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const module = { exports: {} };
  const requireMock = (name) => {
    if (Object.hasOwn(dependencies, name)) return dependencies[name];
    throw new Error("Unexpected dependency: " + name);
  };
  new Function("module", "exports", "require", outputText)(module, module.exports, requireMock);
  return module.exports;
}

const realSite = load("src/lib/site.ts").site;
const values = {
  nome: "Persona di prova",
  email: "visitor@example.test",
  data: "2027-06-01",
  servizio: "Matrimoni",
  messaggio: "Vorrei informazioni sul servizio fotografico.",
};
function form(extra = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ ...values, ...extra })) data.set(key, value);
  return data;
}

test("contact requests stay blocked in the real preview configuration", async () => {
  assert.equal(realSite.contactForm.enabled, false);
  let calls = 0;
  const { sendContact } = load("src/app/contatti/actions.ts", {
    "@/lib/site": { site: realSite },
    "@/lib/contact-delivery": { deliverContact: async () => { calls++; throw new Error("Must not send"); } },
  });
  const result = await sendContact({ status: "idle" }, form());
  assert.equal(calls, 0);
  assert.equal(result.status, "error");
  assert.match(result.message, /anteprima/);
  assert.deepEqual(result.values, values);
});

test("validation, spam trap and provider failure never claim an email was delivered", async (t) => {
  const site = structuredClone(realSite);
  site.contactForm.enabled = true; // Test-only config, never written to the project.
  let calls = 0;
  const { sendContact } = load("src/app/contatti/actions.ts", {
    "@/lib/site": { site },
    "@/lib/contact-delivery": { deliverContact: async () => { calls++; return { ok: false, message: "Provider unavailable" }; } },
  });
  await t.test("invalid fields do not reach the provider", async () => {
    const result = await sendContact({ status: "idle" }, form({ email: "invalid", messaggio: "x" }));
    assert.equal(result.status, "error");
    assert(result.errors.email);
    assert(result.errors.messaggio);
    assert.equal(calls, 0);
  });
  await t.test("honeypot prevents delivery", async () => {
    await sendContact({ status: "idle" }, form({ sito_web: "spam" }));
    assert.equal(calls, 0);
  });
  await t.test("a failed delivery preserves the visitor's input", async () => {
    const result = await sendContact({ status: "idle" }, form());
    assert.equal(calls, 1);
    assert.equal(result.status, "error");
    assert.deepEqual(result.values, values);
  });
});

test("Formspree preparation uses mocked responses only", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalId = process.env.FORMSPREE_FORM_ID;
  const { deliverContact } = load("src/lib/contact-delivery.ts");
  try {
    await t.test("missing or invalid IDs cannot trigger a request", async () => {
      globalThis.fetch = async () => { throw new Error("Unexpected outbound request"); };
      delete process.env.FORMSPREE_FORM_ID;
      assert.equal((await deliverContact(values)).ok, false);
      process.env.FORMSPREE_FORM_ID = "https://invalid.example/endpoint";
      assert.equal((await deliverContact(values)).ok, false);
    });
    process.env.FORMSPREE_FORM_ID = "testform";
    await t.test("valid payload and accepted provider response", async () => {
      globalThis.fetch = async (url, options) => {
        assert.equal(url, "https://formspree.io/f/testform");
        assert.equal(options.method, "POST");
        assert.equal(options.headers.Accept, "application/json");
        const body = JSON.parse(options.body);
        assert.equal(body.email, values.email);
        assert.equal(body.message, values.messaggio);
        assert.equal(body.servizio, values.servizio);
        return new Response('{"ok":true}', { status: 200 });
      };
      assert.equal((await deliverContact(values)).ok, true);
    });
    await t.test("rate limits produce an error and an alternative contact path", async () => {
      globalThis.fetch = async () => new Response("", { status: 429 });
      const result = await deliverContact(values);
      assert.equal(result.ok, false);
      assert.match(result.message, /WhatsApp/);
    });
    await t.test("provider errors are not reported as success", async () => {
      globalThis.fetch = async () => new Response("", { status: 503 });
      assert.equal((await deliverContact(values)).ok, false);
    });
    await t.test("network failures remain recoverable", async () => {
      globalThis.fetch = async () => { throw new Error("Network unavailable"); };
      const result = await deliverContact(values);
      assert.equal(result.ok, false);
      assert.match(result.message, /campi sono rimasti compilati/);
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalId === undefined) delete process.env.FORMSPREE_FORM_ID;
    else process.env.FORMSPREE_FORM_ID = originalId;
  }
});
