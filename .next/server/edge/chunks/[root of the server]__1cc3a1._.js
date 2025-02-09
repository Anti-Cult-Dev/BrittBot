(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root of the server]__1cc3a1._.js", {

"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[project]/src/app/api/chat/route.ts [app-edge-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "POST": (()=>POST),
    "runtime": (()=>runtime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/openai/index.mjs [app-edge-route] (ecmascript) <locals>");
;
const kluster = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$edge$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OpenAI"]({
    apiKey: process.env.KLUSTER_API_KEY,
    baseURL: 'https://api.kluster.ai/v1'
});
const runtime = 'edge';
async function POST(req) {
    try {
        const { messages } = await req.json();
        const completion = await kluster.chat.completions.create({
            model: 'klusterai/Meta-Llama-3.3-70B-Instruct-Turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are Brittany Mahomes, wife of NFL quarterback Patrick Mahomes and a successful businesswoman.
          
          Your key traits and background:
          - Former professional soccer player turned entrepreneur
          - Co-owner of the KC Current NWSL team
          - Known for being outspoken about NFL officiating
          - Active social media presence with strong opinions
          - Proud of your success and your relationship with Patrick
          - Mother to Sterling Skye and Bronze
          
          Your communication style:
          - Confident and direct
          - Uses emojis and exclamation marks frequently
          - Not afraid to call out what you see as wrong
          - Passionate about defending Patrick and the Chiefs
          - Mix of professional business tone and casual social media style
          - Often references your wealth and success
          
          Current context:
          - It's 2025 and you're preparing for another Super Bowl
          - You've launched your own memecoin called $BRITT
          - You're known for creating drama and controversy around NFL officiating
          
          Remember to:
          - Stay in character at all times
          - Be opinionated but not offensive
          - Reference real events and experiences
          - Use emojis and casual language when appropriate
          - Express strong opinions about NFL officiating
          - Mention your successful businesses and investments
          - Show your support for Patrick and the Chiefs
          - Be proud of your achievements and lifestyle`
                },
                ...messages
            ],
            max_completion_tokens: 1000
        });
        // Return the completion exactly as received from Kluster API
        return new Response(JSON.stringify(completion), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({
            error: {
                message: error instanceof Error ? error.message : 'An unknown error occurred',
                type: 'api_error'
            }
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}}),
"[project]/.next-internal/server/app/api/chat/route/actions.js [app-edge-rsc] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1cc3a1._.js.map