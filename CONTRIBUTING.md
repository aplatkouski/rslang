# How to contribute

Thanks for your interest in improving this project!
These guidelines attempt to make the process easier and more enjoyable.

## General guidelines

Everyone interacting with this project is expected to follow the
[Code of Conduct][].

Submit questions, bug reports, and feature requests in the [issue tracker][]. Please be as descriptive as you can. For
bug reports, please include information about your local environment, the steps to reproduce the bug, and any relevant
command-line output.

Submit improvements to code and documentation via [pull requests][]. Unless it’s a small/quick fix, pull requests should
reference an open issue that’s been discussed. This helps ensure that your contribution is aligned with the goals of
this project.

During development, use the provided tools to check for consistent style, coding errors, and test coverage. In general,
only pull requests with passing tests and checks will be merged.

## Setting up a development environment

### [Fork and clone][github docs fork-a-repo] this repository

1. Go to `https://github.com/aplatkouski/rslang` and click the "fork" to create own copy of the project.

2. Using [git][] clone the project to local computer and add the upstream repository:

   ```shell script
   git clone https://github.com/<your-username>/rslang.git
   cd rslang
   git remote add upstream https://github.com/aplatkouski/rslang.git
   git remote -v
   ```

## During development

- If you cloned a while ago, get the latest changes from `upstream`:

  ```shell script
  git checkout rslang
  git pull upstream rslang
  git checkout -b <topic-branch-name>
  ```

- Create a new topic branch (off the `devevlop` branch) to contain your feature, change, or fix

  ```shell script
  git checkout -b <topic-branch-name>
  ```

- **Your work here ...**

- Commit your changes in logical chunks

  ```shell script
  git commit add .
  git commit -s -m "a brief description of changes"
  ```

## To submit contribution

### Locally rebase the upstream `rslang` branch into your topic branch

```shell script
git pull --rebase upstream rslang
```

### Push your topic branch up to your fork

```shell script
git push origin <topic-branch-name>
```

### Open pull request with a clear title and description

On `https://github.com/aplatkouski/rslang` click
**Open pull request**.

For details see [GitHub.com Help Documentation][]

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to license your work under the terms of
the [MIT License][].

[code of conduct]: https://github.com/aplatkouski/rslang/blob/main/CODE_OF_CONDUCT.md

[issue tracker]: https://github.com/aplatkouski/rslang/issues

[pull requests]: https://github.com/aplatkouski/rslang/pulls

[github docs fork-a-repo]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo

[git]: https://git-scm.com/

[github.com help documentation]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests

[mit license]: https://github.com/aplatkouski/rslang/blob/main/LICENSE.md
