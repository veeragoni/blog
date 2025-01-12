# Blog Project

This repository is a blog project where authors can contribute blog posts by editing the `config/authors.ts` file and adding Markdown files to the `content/posts/` folder.

## Example Blog

This project deploys the blog to https://veeragoni.github.io/blog, which is setup to to serve from https://blog.tldrversion.com/ in GitHub Page Settings. I setup a CNAME in my DNS provider to point to veeragoni.github.io so that GitHub route the request to it. GitHub Pages [uses Let's Encrypt](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) to provide SSL certificates, so this is completely free 
Below is an example CNAME setting.

```
Host: blog
Value: veeragoni.github.io
TTL: Automatic
```

## Contributing Blog Posts

To contribute a new blog post, follow these steps:

1. Fork this repository.
2. Edit the `config/authors.ts` file and add your author information if it doesn't already exist.
3. Create a new folder under `content/posts/` with a descriptive name for your blog post.
4. Inside the new folder, create an `index.md` file and write your blog post in Markdown format.
5. Commit your changes and create a pull request.

Once your pull request is reviewed and merged, the GitHub workflow will automatically build and publish the blog to GitHub Pages.

## Project Structure

- `app/`: Next.js app directory
- `components/`: Reusable React components
- `config/`: Project configuration files
- `content/`: Markdown files for blog posts and home page content
- `lib/`: Utility functions and data fetching logic

## Installation

1. Clone the repository:

```bash
git clone https://github.com/veeragoni/blog.git
```

2. Install dependencies:

```bash
cd blog
npm install
```

3. Start the development server:

```bash
npm run build
serve out
```

The blog will be available at `http://localhost:3000`.

## Submit PR

if everything is good, you can make pull request to the main branch. Once PR is accepted your blog will be published via following deployment process.

## Deployment

This project is automatically deployed to GitHub Pages using a GitHub Actions workflow. When a pull request is merged into the main branch, the workflow will build the project and publish the generated files to the `gh-pages` branch, which serves as the deployment target for GitHub Pages.

## Technologies

This project is built using the following technologies and frameworks:

- [Next.js](https://nextjs.org/): React framework for building server-rendered and static websites
- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework
- [Markdown](https://www.markdownguide.org/): Lightweight markup language for writing blog content

## Contributing

Contributions are welcome! Please follow the guidelines in the [Contributing Guide](CONTRIBUTING.md) when submitting changes.

## License

This project is licensed under the [MIT License](LICENSE).
