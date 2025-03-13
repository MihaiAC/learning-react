### Intro
`npx create-next-app@latest`

NextJS is based on RSCs.
Root app file reserved filenames:
- `page.js` = defines a route + automatically becomes entry point for its folder;
- `layout.js` = wraps pages in a persistent layout (for things like putting a navbar on every page)
- `icon.png` = will be used as a favicon;
- `not-found.js, error.js, loading.js, route.js` etc..

Folder structure mirrors the routes that are created. Interesting approach, reduces boilerplate from react-router-dom, but I still prefer Django's approach of defining routes explicitly.

**Link** component to ... link to other components.
Takes a bit of time to load the pages even for a small app.

Naming a folder with `[slug]` for dynamic routing. However, you don't seem to be able to validate what type of slug it is, so you probably need to do it in the component?

To be fair, NextJS' error messages and error panel is on a whole different level.

A folder is not treated as a route unless it contains `page.js | route.js | index.js`.

Components in `error.js` must be a client component. It will be applied to sibling and descendant pages.

Every page component receives a params prop (useful to retrieve path).

#### Importing an image
`import logoImg from "@/assets/logo.png";
Use: logoImg.src`
Also, use `<Image>` instead of `<img>` with next. Can lazy load images, automatically infers image dimensions + optimizes it (resize, compress, serving in webp). Also uses a CDN when deployed on Vercel (? automatically or if specified ?).

For Image, can use fill attribute if you don't know image dimensions (e.g: uploaded by user).

#### Using state
Can only do on client components.
Mark it as a client component with "use client".

RSCs are better for SEO, less client-side JS.

#### usePathname
Get current path (useful for e.g: highlighting the nav bar).
Is a hook, so can only be used in client components.

#### Uploading form data
I see the power of Django's ORM now.
ORMs you can use with Next: Prisma - most popular, Mongoose - if using MongoDB.

#### Validating uploaded images
How?
- MIME type from the file buffer
- Magic numbers to verify file type.
- Size limits.
- Request limits -> timeouts.
- Third party cloud storage -> offer built-in security checks (AWS S3 for instance).
- Sanitizing filenames so attackers will have a harder time finding them.
- Reject based on image dimensions (e.g: 1x1)
- Could use `sharp` package to validate an image.

Serving files uploaded by the user in production => use S3 or equivalent.
**By default, Next only serves static assets present at build time.**

#### Prod vs dev
npm run build = pre-renders every page + caches them;
Never re-fetches backend data used to build the pages by default => you need to tell Next when to re-fetch data: `revalidatePath(/meals)` => refreshes cache.

#### Dynamic data
`export async function generateMetadata()`



### [Error: ENOSPC: System limit for number of file watchers reached angular](https://stackoverflow.com/questions/65300153/error-enospc-system-limit-for-number-of-file-watchers-reached-angular)

The ESLint extension in VSCode watches all the files in node_modules by default, hitting the limit of files you can watch on Ubuntu (65536).


