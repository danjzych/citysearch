<a name="readme-top"></a>
<br />

<div align="center">
  <a href="https://github.com/danjzych/citysearch">
    <h1>CitySearch</h1>
  </a>

  <h3 align="center">An app for searching for cities.</h3>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#using-citysearch">Using CitySearch</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation-and-setup">Installation and Setup</a></li>
        <li><a href="#test">Running Tests</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

An app for searching for cities. For Rentable FE Software Engineer coding exercise. Users can begin typing the city they want to find, and the application will return matches and/or near meatches, depending on the query. Users can then view any of the results on <a href="https://www.rentable.co" target="_blank">Rentable</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Using CitySearch

When starting CitySearch, you will see a landing page. The page has prompts to go to the "Search Cities" page.

On the search cities page, you can do exactly that. It has the following features:

- live (debounced) search
- Flexible matching on city and state
  - City and state are provided, matches will be return based on partial match for city and state. If only one string (no comma) is provided, it will return partial matches on city of state
- pagination of search results
- search persists as query string, allowing for search to persist on reload and be available for link sharing
- links to rentable.co

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

[![React][React]][React-url]
[![Express][Express]][Express-url]
[![Typescript][Typescript-lang]][Typescript-url]
[![Tailwind][Tailwind-css]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local version of CitySearch up and running, do the following.

### Installation and Setup

1. Clone the repo

   ```sh
   git clone https://github.com/danjzych/citysearch.git
   ```

2. cd into city search and use correct node version.

   This application requires node version <code>18.18.0</code> or higher. You can ensure you are using this using node version manager.

   ```sh
    cd ./citysearch
    nvm install
    nvm use
    Now using node v18.18.0
   ```

3. install project dependencies

   ```sh
   npm install
   ```

4. Launch production build:

   ```sh
   npm run start
   ```

   or run in dev mode:

   ```sh
   npm run dev
   ```

   Both commands will automatically open the application in your default browser.

### Running Tests

1. To run tests, enter the following into the command line:

   ```sh
   npm run test:all
   ```

Alternatively, you can navigate into the client and server workspaces directly, and run <code>npm run test:watch</code> to run tests in watch mode for the workspace.

   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Daniel Zych - [LinkedIn](https://www.linkedin.com/in/danielzych/) - danjzych@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This project was in part built with themes and components (i.e., buttons) from:

- [Daisy UI](https://daisyui.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[Typescript-lang]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwind-css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
