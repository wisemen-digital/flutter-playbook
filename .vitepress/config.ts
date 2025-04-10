import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "The Flutter Playbook",
  vite: {
    plugins: []
  },
  srcDir: 'src',
  dir: 'src',
  cleanUrls: true,
  lastUpdated: true,
  description: "The Wisemen way of coding Flutter projects for every platform.",
  base: '/flutter-playbook/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Team', link: '/team' },
    ],
    editLink: {
      pattern: 'https://github.com/wisemen-digital/flutter-playbook/blob/main/src/:path'
    },
    logo: '/bible_logo.png',
    sidebar: [
      { text: 'Architecture', link: '/architecture', items: [
        { text: 'Layers', link: '/architecture/layers' },
        { text: 'Source', link: '/architecture/source' },
        { text: 'Database', link: '/architecture/database' },
        { text: 'Repository', link: '/architecture/repository' },
        { text: 'Feature', link: '/architecture/feature' },
        { text: 'Theming', link: '/architecture/theming' },
        ]
      },
      { text: 'Tools', link: '/tools'},
      { text: 'Testing', link: '/testing', items: [
        { text: 'Unit testing', link: '/testing/unit-testing' },
        { text: 'E2E testing', link: '/testing/e2e-testing' },
        { text: 'Integration testing', link: '/testing/integration-testing' },
        ]
      },
      { text: 'Packages', link: '/packages'},
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wisemen-digital/flutter-playbook' }
    ]
  }
})
