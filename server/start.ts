import 'dotenv/config';
try {
    await import('./index.ts');
} catch (e: any) {
    console.error("ERROR MESSAGE:", e.message);
    console.error("ERROR CODE:", e.code);
}
