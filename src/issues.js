import { issuesMaxResult, issuesURL } from "./constants.js";

export async function getIssues() {
    return await getIssuesRecursive();
}

async function getIssuesRecursive(total = Number.MAX_SAFE_INTEGER, pagingOptions = { maxResults: -1, startAt: 0 }) {
    if (pagingOptions.startAt >= total) {
        return [];
    }
    const data = await fetchIssues(pagingOptions);
    return [...data.issues, ...await getIssuesRecursive(data.total, { maxResults: data.maxResults, startAt: data.startAt + data.maxResults })];
}

async function fetchIssues(pagingOptions) {
    try {
        const response = await fetch(createIssuesURL(issuesURL, pagingOptions));
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Could not fetch issues.') // Some proper error handling and logging here.
        throw err;
    }
}

function createIssuesURL(url, pagingOptions) {
    return `${new URL(url)}&${new URLSearchParams(pagingOptions)}`; // will work with appended '&' and no params at the end
}

// ------------------------------------------------------------------------------------------------------------------
// INFO: This is what I would do to speed things up if I was sure that atlassian wouldn't change the maxResults on me
// makes one more request to check the total number, but parallelizes the rest of requests
async function getIssuesConcurrently() {
    const totalRequests = Math.ceil((await getTotalIssues()) / issuesMaxResult);
    const issues = await Promise.all(
        new Array(totalRequests)
            .fill(null)
            .map(async (val, index) => getIssuesData({ maxResults: issuesMaxResult, startAt: index * issuesMaxResult })
            ));
    return issues.flat();
}

async function getIssuesData(pagingOptions) {
    return (await fetchIssues(pagingOptions)).issues;
}

async function getTotalIssues() {
    const response = await fetch(createIssuesURL(issuesURL, { maxResults: 0 }));
    const data = await response.json();
    return data.total;
}
