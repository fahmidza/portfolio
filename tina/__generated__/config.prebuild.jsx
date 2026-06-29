// tina/config.js
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io (not needed for local development)
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "dummy-client-id",
  // Get this from tina.io (not needed for local development)
  token: process.env.TINA_TOKEN || "dummy-token",
  build: {
    outputFolder: "admin",
    publicFolder: "static",
    basePath: "portfolio"
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "static"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "\u{1F4DD} Blog & Activities",
        path: "blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "new-post"}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "authors",
            label: "Authors",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            },
            description: "Type a tag and press Enter"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "projects",
        label: "\u{1F680} Projects",
        path: "docs/projects",
        format: "md",
        match: {
          exclude: "index"
        },
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "new-project"}`;
            }
          }
        },
        fields: [
          {
            type: "number",
            name: "sidebar_position",
            label: "Sidebar Position"
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            },
            description: "Type a tag and press Enter"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "pages",
        label: "\u{1F4C4} Pages",
        path: "docs",
        format: "md",
        match: {
          include: "{about,projects/index}"
          // We can't match both .md and .mdx easily in one rule if format is "md" but Tina handles it somewhat
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "number",
            name: "sidebar_position",
            label: "Sidebar Position"
          },
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "boolean",
            name: "hide_table_of_contents",
            label: "Hide Table of Contents"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
