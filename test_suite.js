/**
 * MatchWise Lite - Comprehensive Node.js Smoke Test Suite
 * Zero-dependency verification for psychometrics, security, exports, and AI fallbacks.
 * Run with: node test_suite.js
 */

const assert = require("node:assert");

// 1. Mock minimal browser environment for files expecting window / localStorage / document
global.window = global;
global.document = {
    readyState: "complete",
    addEventListener: () => {},
    documentElement: { className: "", setAttribute: () => {} },
    querySelector: () => null,
    getElementById: () => null
};


const storageStore = {};
global.localStorage = {
    getItem: (k) => storageStore[k] !== undefined ? storageStore[k] : null,
    setItem: (k, v) => { storageStore[k] = String(v); },
    removeItem: (k) => { delete storageStore[k]; },
    clear: () => { Object.keys(storageStore).forEach(k => delete storageStore[k]); }
};

let passedCount = 0;
let totalCount = 0;

function test(name, fn) {
    totalCount++;
    try {
        fn();
        console.log(`  ✅ PASS: ${name}`);
        passedCount++;
    } catch (err) {
        console.error(`  ❌ FAIL: ${name}`);
        console.error(err);
        process.exitCode = 1;
    }
}

async function runAsyncTest(name, fn) {
    totalCount++;
    try {
        await fn();
        console.log(`  ✅ PASS: ${name}`);
        passedCount++;
    } catch (err) {
        console.error(`  ❌ FAIL: ${name}`);
        console.error(err);
        process.exitCode = 1;
    }
}

async function runAllTests() {
    console.log("\n🧪 Running MatchWise Lite Automated Verification Suite...\n");

    // --- TEST GROUP 1: DEMO PROFILES EXPORTS ---
    console.log("📦 1. Testing Demo Profiles & Global Window Exports:");
    const demoProfiles = require("./demo_profiles.js");

    test("DEMO_PROFILES is exported to window and module", () => {
        assert.ok(Array.isArray(demoProfiles), "DEMO_PROFILES should be an array");
        assert.strictEqual(demoProfiles.length, 2, "DEMO_PROFILES should contain 2 archetypes");
        assert.ok(window.DEMO_PROFILES, "window.DEMO_PROFILES must be attached to global window");
        assert.strictEqual(window.DEMO_PROFILES.length, 2, "window.DEMO_PROFILES must have 2 profiles");
    });

    test("Tariq & Nour archetypes have valid IDs and owner names", () => {
        const tariq = demoProfiles[0];
        const nour = demoProfiles[1];
        assert.strictEqual(tariq.id, "MW_TARIQ_ALMANSOOR");
        assert.strictEqual(tariq.owner_name, "Tariq Al-Mansoor");
        assert.strictEqual(tariq.owner_name_ar, "طارق المنصور");
        assert.strictEqual(nour.id, "MW_NOUR_ALSABAH");
        assert.strictEqual(nour.owner_name, "Nour Al-Sabah");
        assert.strictEqual(nour.owner_name_ar, "نور الصباح");
    });

    // --- TEST GROUP 2: UTILITIES & XSS SECURITY VALIDATION ---
    console.log("\n🔒 2. Testing Cryptography & Security Schema Validation:");
    const utils = require("./utils.js");
    const { Cryptography, Utils } = utils;

    test("escapeHtml properly escapes HTML special characters", () => {
        const malicious = `<script>alert("XSS & 'pwned'")</script>`;
        const escaped = Utils.escapeHtml(malicious);
        assert.strictEqual(escaped.includes("<script>"), false);
        assert.strictEqual(escaped.includes("&lt;script&gt;"), true);
        assert.strictEqual(escaped.includes("&quot;"), true);
    });

    test("validateAndSanitizeProfile strips XSS payloads from owner_name", () => {
        const maliciousPayload = {
            id: "attacker_profile",
            owner_name: `<img src=x onerror="window.__XSS_PROOF=true">Attacker Name`,
            gender: "M",
            marital_status: "single",
            answers: { q1: "opt1", q2: 5 }
        };

        const sanitized = Cryptography.validateAndSanitizeProfile(maliciousPayload);
        assert.ok(sanitized, "Should return sanitized object");
        assert.strictEqual(sanitized.owner_name, "Attacker Name", "HTML tags must be completely stripped");
        assert.strictEqual(sanitized.owner_name.includes("<img"), false);
    });

    test("validateAndSanitizeProfile rejects invalid or empty profiles", () => {
        assert.strictEqual(Cryptography.validateAndSanitizeProfile(null), null);
        assert.strictEqual(Cryptography.validateAndSanitizeProfile({}), null);
        assert.strictEqual(Cryptography.validateAndSanitizeProfile({ owner_name: "<script></script>" }), null);
    });

    test("MWCODE generation and parsing round-trip preserves clean data", () => {
        const testProfile = {
            id: "MW_TEST_123",
            owner_name: "Sarah Parker",
            gender: "F",
            marital_status: "married",
            answers: { q1: "opt1", q2: 7 }
        };

        const code = Cryptography.generateResultCode(testProfile);
        assert.ok(code.startsWith("MWCODE-"), "Code should start with MWCODE- prefix");

        const parsed = Cryptography.parseResultCode(code);
        assert.ok(parsed, "Parsed profile must not be null");
        assert.strictEqual(parsed.owner_name, "Sarah Parker");
        assert.strictEqual(parsed.gender, "F");
        assert.strictEqual(parsed.marital_status, "married");
        assert.strictEqual(parsed.answers.q2, 7);
    });

    // --- TEST GROUP 3: PSYCHOMETRIC ENGINE & CLAMP AUDIT ---
    console.log("\n🧠 3. Testing Psychometric Engine & Clamping Behavior:");
    const traitsModule = require("./traits.js");
    const PersonalityEngine = traitsModule.PersonalityEngine || traitsModule;
    const questions = require("./questions_data.js");

    test("PersonalityEngine calculates full 10-framework profile for Tariq", () => {
        const tariqAnswers = demoProfiles[0].answers;
        const result = PersonalityEngine.calculate(tariqAnswers, questions);

        assert.ok(result.hartman, "Must include Hartman color");
        assert.ok(result.disc, "Must include DISC");
        assert.ok(result.birkman, "Must include Birkman");
        assert.ok(result.firo_b, "Must include FIRO-B");
        assert.ok(result.tki_conflict, "Must include TKI Conflict");
        assert.ok(result.gottman_safety, "Must include Gottman Safety");
        assert.ok(result.attachment_ecr, "Must include Attachment ECR");
        assert.ok(result.schwartz_values, "Must include Schwartz Values");
        assert.ok(result.consciousness, "Must include Consciousness (Hawkins & Hicks)");
        assert.ok(result.maslow_profile, "Must include Maslow's Hierarchy of Needs profile");
        assert.ok(result.developmental_profile, "Must include Human Development (Kegan & Bowen) profile");
        
        // Validate Maslow profile sum
        const tiers = result.maslow_profile.tiers;
        const tierSum = tiers.somatic + tiers.safety + tiers.belonging + tiers.esteem + tiers.actualization + tiers.transcendence;
        assert.strictEqual(tierSum, 100, `Maslow tiers must sum to 100% (got ${tierSum})`);
        assert.strictEqual(result.maslow_profile.d_need_pct + result.maslow_profile.b_need_pct, 100, "D-Need and B-Need percentages must sum to 100%");
        assert.ok(result.maslow_profile.primary_need, "Primary need center of gravity must exist");

        // Validate Developmental profile
        const kScore = result.developmental_profile.kegan.score;
        assert.ok(kScore >= 2.0 && kScore <= 5.0, `Kegan score must be between 2.0 and 5.0 (got ${kScore})`);
        const diffScore = result.developmental_profile.differentiation.score;
        assert.ok(diffScore >= 1.0 && diffScore <= 5.0, `Differentiation score must be between 1.0 and 5.0 (got ${diffScore})`);

        assert.ok(result.assessment_confidence >= 15 && result.assessment_confidence <= 100, "Confidence in range");
    });

    test("assessment_confidence honestly reflects low completeness when few questions are answered", () => {
        // Only 2 answers provided
        const sparseAnswers = { q1: "opt1", q2: "opt2" };
        const result = PersonalityEngine.calculate(sparseAnswers, questions);

        // Previous flawed code clamped to minimum 65!
        // Now it should honestly be low (e.g. < 50)
        assert.ok(result.assessment_confidence < 60, `Confidence should be low for sparse answers (got ${result.assessment_confidence})`);
    });

    // --- TEST GROUP 4: COMPATIBILITY ENGINE ---
    console.log("\n💞 4. Testing Compatibility Engine:");
    const compatibilityModule = require("./compatibility.js");
    const CompatibilityEngine = compatibilityModule.CompatibilityEngine || compatibilityModule;

    test("Compatibility calculation runs successfully for Tariq & Nour", () => {
        const tariq = demoProfiles[0];
        const nour = demoProfiles[1];
        const comp = CompatibilityEngine.compare(tariq, nour);

        assert.ok(comp, "Compatibility output should exist");
        assert.ok(typeof comp.overall_index === "number", "overall_index must be a number");
        assert.ok(comp.overall_index >= 10 && comp.overall_index <= 100, "overall_index within range");
        assert.ok(Array.isArray(comp.strengths), "Strengths array should exist");
        assert.ok(Array.isArray(comp.challenges), "Challenges array should exist");
        assert.ok(comp.category_scores, "Category scores object should exist");

        // Validate Dyadic Needs Dynamics
        const needsDyn = comp.multi_framework_dynamics?.needs_dynamics;
        assert.ok(needsDyn, "Multi-framework dynamics must contain needs_dynamics");
        assert.ok(typeof needsDyn.archetype === "string" && needsDyn.archetype.length > 0, "Needs archetype must be a defined non-empty string");
        assert.ok(needsDyn.overlap_score >= 20 && needsDyn.overlap_score <= 100, "Needs overlap score in range 20-100");
        assert.ok(needsDyn.category_score >= 35 && needsDyn.category_score <= 98, "Needs category score in range 35-98");
        assert.strictEqual(comp.category_scores["Needs & Human Development"], needsDyn.category_score, "Category score must match needs_dynamics score");
    });

    // --- TEST GROUP 5: AI GUIDANCE SYSTEM & FALLBACKS ---
    console.log("\n🤖 5. Testing AI Guidance System & Offline Fallbacks:");
    require("./ai_service.js");
    const AIService = window.AIService;

    await runAsyncTest("generateInstruction provides curated advice in builtin mode without throwing", async () => {
        global.localStorage.clear();
        const ai = new AIService();
        ai.setConfiguration("builtin", "");

        const landingTipEn = await ai.generateInstruction("landing", "en");
        assert.ok(landingTipEn && landingTipEn.length > 20, "Should return curated landing tip in English");
        assert.strictEqual(landingTipEn.includes("Quick tip: Read the instructions carefully"), false, "Must not be generic placeholder");

        const landingTipAr = await ai.generateInstruction("landing", "ar");
        assert.ok(landingTipAr && landingTipAr.length > 20, "Should return curated landing tip in Arabic");
        assert.strictEqual(landingTipAr.includes("نصيحة سريعة: احرص"), false, "Must not be generic placeholder");

        const questionTip = await ai.generateInstruction("question_q1_pace", "en");
        assert.ok(questionTip && questionTip.length > 15, "Should return question contextual tip");
    });

    // --- SUMMARY ---
    console.log(`\n========================================`);
    console.log(`Verification Complete: ${passedCount}/${totalCount} tests passed.`);
    console.log(`========================================\n`);

    if (passedCount !== totalCount) {
        process.exit(1);
    }
}

runAllTests().catch(err => {
    console.error("Fatal Test Suite Error:", err);
    process.exit(1);
});
