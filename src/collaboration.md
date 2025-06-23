# Collaboration

Every GitHub repository we use has branch protection rules on the main branch. These rules state that every pull request has to be reviewed by a code owner. Code owners are the developers actively working on the project and some others in our team. To make sure every PR is reviewable we tend to follow these guidelines.

## 🤝 Pull request guidelines

### Project setup is one commit/PR

We use code generation to create new projects so this is instantly a huge amount of changes. These don't need to be reviewed thoroughly since they come from a brick we maintain. Changes other than setting up app icons or a splash screen will be denied and the PR won't get merged.

### Split PRs up

To make the reviewer's life a bit easier we'd like to keep our PRs as small as possible. The way we split our code up is mostly just common sense, but here are some examples:
- Make PRs for layers that can function on their own (ie. network or database)
- Don't combine features (ie. split a list view and detail)

### (Almost) no comments

We don't accept commented code blocks at all. Writing doc comments for functions or variables is fine (even encouraged for widgets in shared). In general we'd like our code to be easy to understand without comments.

### Imports/barrels

Barrel files are a nice way to keep your imports clear and concise. These are easy to generate using this [extension](https://marketplace.visualstudio.com/items?itemName=miquelddg.dart-barrel-file-generator). Whenever you're importing something within the current feature, you should import the feature's barrel file (feature_name.dart) as a relative import. For other imports we use absolute paths.
