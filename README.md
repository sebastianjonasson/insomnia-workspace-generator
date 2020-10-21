# insomnia-workspace-generator
Insomnia workspace generator, with OAuth2 authentication applied.

I created this simple CLI to make it easier for team members at Timezynk to get started using our REST API. It's basically just importing the OpenAPI specification and applying OAuth2 with provided username and password credentials. 

At the time when I implemented this Insomnia did not support OAuth2 when importing from an OpenAPI specification file. After implementing and using the CLI I thought it be better to just submit a PR ([Link](https://github.com/Kong/insomnia/pull/2184)) for this missing feature instead, which also later got approved.  
