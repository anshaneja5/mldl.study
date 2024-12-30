# MLDL.Study 🌐

**MLDL.Study** is a free and interactive learning platform designed to simplify Machine Learning (ML) and Deep Learning (DL) education for students and enthusiasts. Currently focused on Indian audiences, the platform features curated roadmaps, videos, articles, and other learning materials.

## Features ✨

- **Interactive Roadmaps**: Easy-to-follow paths for ML and DL concepts
- **Diverse Resources**: Video tutorials, articles, PDFs, and notes curated for each topic
- **Community Growth**: Over 6000+ users

## Getting Started 🚀

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anshaneja5/mldl.study.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure 📁

The content is organized into two main files:
- `categorizedMLContent.js` - ML-related resources
- `categorizedDLContent.js` - DL-related resources

Both files use simple JSON-like structures that anyone can contribute to.

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

## Future Plans 🛠️

- **English Audience Expansion**: Adding content suited for global learners
- **Python Programming Roadmap**: A comprehensive roadmap for Python and related libraries
- **Generative AI and Other Fields**: Roadmaps for fields like GenAI, Reinforcement Learning etc.

## Contact 📫

Feel free to reach out if you have any questions:

- **Creator**: Ansh Aneja
- **Email**: anshanejaa@gmail.com
- **LinkedIn**: [linkedin.com/in/anshaneja5](https://www.linkedin.com/in/anshaneja5)

---

Thank you for contributing to MLDL Study! Your efforts make this platform better for learners worldwide. 🌟
