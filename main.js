import { getLeadlessComponentsWithIssueCount } from "./src/herocoders.js";

async function main() {
    const leadlessComponentsWithIssueCount = await getLeadlessComponentsWithIssueCount();
    console.table(leadlessComponentsWithIssueCount, ['component', 'issueCount']);
}

main();