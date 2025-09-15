# Web Editor

## 📝 Concept

**Web Editor** is a platform that provides HTML, JavaScript, and CSS templates for users to complete.
The goal is to help users learn and practice by filling in the missing parts of provided templates.

---

## 🧩 Creating a Template

1. Go to the **Create** page on the website.

2. Fill in the **HTML**, **JavaScript**, and **CSS** sections.

3. Click the button to **generate the JSON** for your template.

4. Then, go to the project’s repository:

    * Navigate to the `public/templates` folder.
    * Click **Add file** → **Create a new branch**.
    * Add your JSON file and open a **pull request** (PR).

5. In your PR:

    * Use a clear title, for example:

      ```
      files: add the template using function
      ```
    * Add a short description, for example:

      ```
      This pull request introduces a new template to learn how to use JavaScript functions.
      ```

6. Once your PR is open, apply the label **ready to merge**.

---

## 🤝 Contributing

### Getting the source code

```bash
git clone git@github.com:digizelle/web-editor.git
cd web-editor
npm ci
```

### Running the project in development mode

```bash
npm run dev
```

### Commits
Commits and pull request titles must start with fix/feat/docs/tech/refactor/test/style and : and the title. For example:
"feat: create the new page"
