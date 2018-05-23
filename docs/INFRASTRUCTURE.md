# Utensil Build/Deployment Infrastructure
In production, the app should be able to be started up easily with minimal setup, and new versions should be easy to deploy with minimal downtime.
From a developer standpoint, the workflow should look something like this:
- Develop feature
- Review feature
- Land feature
- Tag version
- Push tag to GitHub

To make this happen, there are a few moving parts. A high-level overview of the system can be found [here](./CI_CD.pdf).
