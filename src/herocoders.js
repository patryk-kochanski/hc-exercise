import { getLeadlessComponents } from "./components.js";
import { getIssues } from "./issues.js";

export async function getLeadlessComponentsWithIssueCount() {
    const components = await getLeadlessComponents();
    if(!components.length) {
        return;
    }

    const issues = await getIssues();
    const matched = matchIssuesToComponents(issues, components);

    return Array.from(matched, ([key, value]) => ({ component: key, issueCount: value.length}));
}

function matchIssuesToComponents(issues, components) {
    const componentsWithIssues = new Map(components.map(component => [component.name, []]));
    issues.forEach(issue => {
        issue.fields.components.forEach(component => {
            const found = componentsWithIssues.get(component.name);
            if(found) {
                found.push(issue);
            }
        })
    });
    return componentsWithIssues;
}

