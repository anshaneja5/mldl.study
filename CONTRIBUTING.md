## Contributing 🤝

We welcome community contributions! Here's how you can help:

### Adding New Resources

1. Open the relevant file (`categorizedMLVideos.js` or `categorizedDLVideos.js`)
2. Follow the existing structure to add your resource:
   ```javascript
    {
        title: "Handling Missing Data | Part 1 | Complete Case Analysis",
        url: "https://youtube.com/watch?v=aUnNWZorGmk",
        articleLink:"https://www.theanalysisfactor.com/missing-data-mechanism/", //Could be any link and not just article
        articleTitle: "Missing Data Mechanism",
        notes: "NOTE: This article is a great resource to understand the different mechanisms of missing data."
   },
   ```
3. Ensure the resource title is concise and self-explanatory

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/add-resources
   ```

2. Make and commit your changes:
   ```bash
   git add .
   git commit -m "Added new resources for ML roadmap"
   ```

3. Push changes and create a Pull Request:
   ```bash
   git push origin feature/add-resources
   ```

### Contribution Guidelines

- Ensure code is well-formatted and follows project conventions
- Validate that added resources are high-quality and freely available
- Keep commit messages clear and concise
- Test changes locally before submitting a PR
