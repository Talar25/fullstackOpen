A team of about 6 people that codes an application in Java needs to do common CI setup: linting, testing and building. Linting should always be the first step of CI process, in Java development it can be done by tool named "Checkstyle". Checkstyle identifies potential problems in code like wrong formatting, problems with naming conventions and other minor problems.
With linting done CI can go on to testing, in Java code JUnit is widely used tool. It provides assertions for verifying expected outcomes. Its purpose is unit testing, but it can also do funcional testing.
After linting and testing java code needs to be built.
One of the most popular tools for build is Apache Maven. It defines project structure, its dependencies

Alternatives to Github Actions and Jenkins are tools like Travis CI, GitLab CI/CD or CircleCI.

Based on information about size of the group, I would say that there is no need for self-hosted setups such as Jenkins and its much better to use cloud-based solution like Github Action. Yes Github Action is not as versetile as self hosted option, configuration is lacking, but this group of programmers is not necesserely big enough.
