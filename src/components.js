import { componentsURL } from "./constants.js";

export async function getComponents() {
    try {
        const response = await fetch(componentsURL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Could not fetch components.') // Some proper error handling and logging here.
        throw err;
    }
}

export async function getLeadlessComponents() {
    const components = await getComponents();
    return components.filter(component => !component.lead);
}
