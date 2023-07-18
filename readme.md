# Herocoders exercise

# Run
**Requires NodeJS version 18.16.1(LTS) or higher!**  
No installation required, uses only native modules.

```
node main.js
```
```
npm run start
```

# Output
```
┌─────────┬───────────────────┬────────────┐
│ (index) │     component     │ issueCount │
├─────────┼───────────────────┼────────────┤
│    0    │     'Backend'     │     65     │
│    1    │ 'Synchronization' │     12     │
│    2    │    'Templates'    │     25     │
└─────────┴───────────────────┴────────────┘
```


# Exercise description
 Facts:

- Our team stores “issues” (tickets to solve) in Jira at the following URL: https://herocoders.atlassian.net
- You can find a copy of public issues related to the 'Issue Checklist' project at https://herocoders.atlassian.net/projects/SP
- Every issue is described by a set of fields like ‘summary,’ ‘description,’ ‘assignee,’ ‘component’ (e.g., UI, configuration, DB), etc.
- Jira allows setting a person responsible for the 'component', the person is called a 'component lead'. (Please do not confuse that with the component's assigneeType called COMPONENT_LEAD)
- Jira allows reading information about the project and issues through REST API


Problem to solve:

Please create a pure JavaScript / NodeJS code that uses Jira REST API to retrieve data from the Sample Project, and writes in human-readable form (to the console or a file) a list of components that don't have a 'component lead', along with the number of issues from this project which belongs to the component.


API endpoints:

- You can retrieve a list of components for the Sample Project along with the fields describing them (e.g., 'component lead') through endpoint 'rest/api/project/IC/components'. Curl example: curl --request GET --url 'https://herocoders.atlassian.net/rest/api/3/project/SP/components'
- You can retrieve a list of issues for the Sample Project along with the fields describing them (e.g., 'components') through the endpoint 'rest/api/3/search?jql=project=SP' (please note the JQL search term in the query - you can use it to limit/control the list of issues returned by the endpoint). Curl example: curl --request GET --url 'https://herocoders.atlassian.net/rest/api/3/search?jql=project%20%3D%20SP%20'


Requirements & hints:
- Please use pure JavaScript
- Please use the REST API endpoints listed above (don't use other endpoints, but feel free to change the parameters).
- Please use as few resources as possible and optimize the code to perform as few API requests as possible.
- You can use NodeJS and external libraries like Axios, lodash, etc. that help you achieve the task
- The quality of the solution should be “production” like.
- Tests are always welcome but not required.
- Please send the source code as a link to GitHub, Bitbucket, JSbin, or any other service of your choice.
- Please attach the output/answer produced by your code as a file “output.txt” in the code repository
- It might be helpful to quickly see in the browser the list of issues with the assigned component using the following URL: https://herocoders.atlassian.net/issues/?jql=project%20%3D%20SP%20and%20component%20is%20not%20empty
- Issues assigned to Frontend component might be checked here: https://herocoders.atlassian.net/issues/?jql=project%20%3D%20SP%20AND%20component%20%3D%20Frontend