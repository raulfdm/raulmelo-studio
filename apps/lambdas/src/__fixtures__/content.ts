export const postApi = [
  {
    id: 'fe63b616-8f70-44c3-9227-fd0625ca3103',
    objectID: 'Content_fe63b616-8f70-44c3-9227-fd0625ca3103',
    excerpt:
      "Monorepo architecture has become more popular over the years, which is understandable considering the problem it solves. The biggest challenge, though, is finding an easy-to-use tool for handling such a structure.\n\nIf you Google \"monorepo tool javascript\", you'll find many articles showing the most popular options we have, and curiously each one attempts to solve that problem in a very different way.\n\nFrom the options we have, some are there for a while (like Lerna) but no longer actively maintained; others never went out from draft (like Bolt), others are working fine but only for a specific kind of project.\n\nUnfortunately, we don't have a killer tool that fits all types of JavaScript/Typescript projects and all sizes of teams, and that's understandable.\n\nYet there's one (\"new\") option that might help us in most cases: **pnpm workspaces**.\n\nBut before talking about pnpm, let me tell you my monorepo/workspaces usage and how I managed to solve that in the first place.\n\n\n\n My Blog\n\nWhen I first created my blog, I bootstrapped a Next.js application, put it into a git repository, and pushed the scaffolding code there.\n\nAfter a while, I needed to set up the CMS to hold my content. Then I created a Strapi application, put it into another git repository, and pushed it to another Github repo.\n\nThen, I decided to fork a library called `mdx-prism` to fix some minor problems and automate its deployment. Once again, another new git repository containing its code and setup.\n\nI had 3 git repos implied that I had 3 eslint, prettier, jest, babel, and typescript configs, but I handled it for a while.\n\nSoon, I became bothered by every dependency update (like TypeScript); I had to update in all repositories (three pull requests). Every new thing I learned like a new eslint rule, I agree, I had to go in there and change three times and so on.\n\nMy first instinct was:\n\n> What if I put all projects inside a single folder and repository, create my base config and use it to extend each project's config?\n\nUnfortunately, I couldn't simply drop the files there, extend, and hope it works because things are more complex than that. The tools need module/file resolution, and I didn't want to ship all projects when I was about to deploy.\n\nAt that moment, I realized I needed a monorepo tool to do this linking and make my experience better.\n\nI tried some solutions, and the easiest way to get up and running was Lerna + Yarn Workspaces.\n\nOf course, along the setup process, I had had some gotchas like understanding why some builds were failing (not all apps likes hoisted dependencies), had to adapt my pipelines, and how I deployed each project. Still, I managed everything and had a decent setup.\n\nWith the bare minimum setup, I started to create even more small independent modules/apps to re-use, extend and try out new tools without impacting my existing code. That was the moment I saw with my own eyes how amazing it's working a monorepo.\n\n\n\n About Lerna + Yarn Workspaces\n\nLerna is a high-level monorepo tool that provides abstractions to simultaneously manage a single or multiple apps/packages. \n\nYou can run commands (e.g., build, test, lint) for all the projects you control with a single command-line instruction, or if you prefer, you can even filter a specific project with the flag `--scope`.\n\nYarn Workspaces is a low-level tool that handles the packages installation, creates a symlink between projects, and allocates the modules in root and controlled projects folders.\n\nYou can use either Lerna or Yarn Workspaces to manage your repository, but you may have noticed that they are more complementary than exclusionary. In other words, they work really well together.\n\nEven nowadays, this combination is still a good choice, but some \"problems\" might be highlighted:\n\n- Yarn Workspaces (at least for v1) is no longer receiving new features and improvements (the last update was from 2018);\n- Lerna documentation is OK, but you have to figure out a lot of things by yourself;\n- Lerna publishing system is not as simple as it seems, especially to generate automated publishes with commit lint;\n- You can easily get lost on understanding the commands you have to run or what commands are being run by other commands you invoke;\n- Lerna CLI  has problems like [you cannot install multiple dependencies at the same time](https://github.com/lerna/lerna/issues/2004);\n- Lerna CLI `--scope` is not reliable and hard to understand and use;\n- There's a [wizard](https://github.com/webuniverseio/lerna-wizard) to help us with regular tasks, but it seems to be being maintained outside the main repo;\n- [Lerna is currently unmaintained](https://github.com/lerna/lerna/issues/2703issuecomment-744601134);\n\nBy the time it was created (in 2015), Lerna had come up to help us with this lack of tooling to manage JS monorepos, and it did amazingly well.\n\nThough because they might not have a dedicated team (or a few people) to work on that, plan the future of the tool, Lerna is slowly dyin",
    date_timestamp: '1637107200',
    tags: [
      {
        _id: 'a98ba9c8-b2ec-4fdd-a47d-80714402d9b4',
        name: 'pnpm',
        slug: 'pnpm',
      },
      {
        _id: '92be336e-3b55-40df-93e7-7942428bd8b9',
        name: 'Package Manager',
        slug: 'package-manager',
      },
      {
        _id: '74087cc8-2774-4aa6-b39d-15f12e457351',
        name: 'JavaScript',
        slug: 'javascript',
      },
      {
        _id: '7fc7bb85-6f69-4d28-a04d-1f1a29953880',
        name: 'Monorepo',
        slug: 'monorepo',
      },
    ],
    featuredImage: {
      height: 1260,
      url: 'https://cdn.sanity.io/images/gc3hakk3/production/f3be09a1be3373867ac367d2425e80c37958a9bb-2400x1260.png',
      width: 2400,
    },
    language: 'en',
    slug: 'replacing-lerna-and-yarn-with-pnpm-workspaces',
    title: 'Replacing Lerna + Yarn with PNPM Workspaces',
  },
  {
    id: 'c1d296f4-35b0-41c2-99be-beff7583f193',
    objectID: 'Content_c1d296f4-35b0-41c2-99be-beff7583f193',
    excerpt:
      "Hey, devs.\n\nToday I want to present to you a simpler and (IMO) better way to have installed different versions of the same runtime in your machine with a single tool called `asdf`.\n\nThe tool itself is relatively simple, the docs are well written and you won’t have trouble getting started asap.\n\nHere I will just make a summary and present you some gotchas I had after a while using it.\n\n\n\n The Hell of Runtime Versions\n\nBack in 2013 when I was learning development in college, I remember having a lot of trouble running some projects because they rely on a specific Java version.\n\n“Oh, this one uses Java 5, I need to download the runtime. But wait, I already have Java 6 in my machine… damn”\n\nThis was very overwhelming, especially because I didn’t have much experience and back then my professors and colleagues didn’t know a better way of easing this problem.\n\nIn the first company I started work as a software developer, all backend apps were written in ruby and well… the exact same problem.\n\nTo avoid consuming the production/staging environment while I was coding my client-side application, I needed to run a couple of servers in my machine and, again, they required different ruby versions.\n\nLuckily the backend team had a wiki page recommending to use a tool called RVM (Ruby Version Manager), which as the name already explains itself, is a CLI to control multiple ruby versions in our machine.\n\nAnd it worked pretty well, to be honest.\n\nAfter a while coding front-end applications, I started to see more often the same problem happening with node js.\n\n> This project uses node 7. But I have node 10 installed... Oh no…\n\nWhen I googled to find a similar solution as `rvm`, I found NVM (Node Version Manager), which does the same thing as `rvm` but for the Node runtime.\n\nOk, now I have 2 CLIs to handle the same problem.\n\nIt was then I started to study Go and thought: “oh, here we go again… another CLI”.\n\nAfter I complained about that to a colleague he said:\n\n> Why the heck don't you use `asdf` for all these languages?\n\nAnd my mind explodes because of course, if I was bothered dealing with that, someone in the plant was bothered as well, and most importantly: he/she had already created a tool that solves this problem.\n\n\n\n The Master CLI: asdf\n\n`asdf` is a CLI tool that solves the runtime version management in a well-architected and elegant way: by being a single tool for all runtimes.\n\nThe idea is that `asdf` is a core application that does the handling heavy-lifting of providing CLI options, being hooked via terminal, etc. but instead of also solving the version available for **every single runtime that exists**, it delegates this to third party plugins.\n\n![asdf workflow](https://res.cloudinary.com/duzei21zt/image/upload/v1625743285/site/asdf_1_4ab74a00a5.png)\n\nThis means that `asdf` does not care about any runtime like java, go, deno, rust, or whatever, but it provides an abstract interface where someone in the community can simply create and maintain a plugin that provides all the information to download the version X for example.\n\nIf you’re familiar with Front-end development, this is pretty much like babel does. It handles our code but you can write your plugin that hooks there and do something else without creating a burden to the Babel’s team to maintain the code itself.\n\nThe following sections will show how the tooling works. If you want to try, you need to make sure that you have `asdf` properly installed and configured in your bash, fish, or zsh terminal configuration.\n\n> [asdf installation guide](https://asdf-vm.com//core-manage-asdf?id=install)\n\n Plugins\n\nAs I mentioned, a plugin is a specific runtime manager. In that sense, the `asdf-ruby` plugin only deals with how to download ruby runtime, which version was released, etc.\nInstalling a plugin is relatively easy but I strongly recommend you check the plugin’s repository and see if there are more instructions needed before adding it.\n\n> Check here [all plugins available](https://asdf-vm.com//plugins-all) for `asdf`\n\nIn general, the instruction follows the same basic way of installing, running `asdf plugin add <plugin-name> <git-url>`. The `git-url` isn’t required but recommended just to be sure you’re consuming for the correct repository:\n\n```bash\nasdf plugin add nodejs\nasdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git\n```\n\nNow, my `asdf` will have 2 plugins: one capable to manage node versions and another to manage ruby versions.\n\n Versions\n\nThe plugin itself won’t add any version by default. It’s time to finally install some versions we want to use in some projects.\n\nFor this example I want to have in my machine:\nLatest `10.2` version of node\nLatest `14` version of node\nExact `2.6.5` version of Ruby\nLatest `2.7` version of Ruby\n\nFor all these versions I'll run `asdf install <plugin-name> <version>`. So all I need to do is running in the terminal:\n\n```bash\nasdf install nodejs latest:10.2\nasdf install nodejs latest:14\nasdf install ruby 2.6.5\nasdf instal",
    date_timestamp: '1625702400',
    tags: [
      {
        _id: '96f6acec-77a2-4940-b09d-51bb6d036f53',
        name: 'Tooling',
        slug: 'tooling',
      },
      {
        _id: 'fbdf4642-4a9b-4feb-93ca-64e57f8bb9f6',
        name: 'Software Development',
        slug: 'software-development',
      },
      {
        _id: '923bef9b-658c-40cd-8b8a-42291e5d8268',
        name: 'Runtime Management',
        slug: 'runtime-management',
      },
    ],
    featuredImage: {
      height: 3316,
      url: 'https://cdn.sanity.io/images/gc3hakk3/production/e97a867f0e9443c42b8a042e3d714c8594f36f08-5196x3316.jpg',
      width: 5196,
    },
    language: 'en',
    slug: 'how-to-manage-multiple-runtime-versions-with-a-single-tooling',
    subtitle: 'A quick walkthrough on asdf CLI',
    title: 'How to Manage Multiple Runtime Versions With a Single Tooling',
  },
  {
    id: '9260ffdc-e0b9-4706-a36b-beae7b7c3f2d',
    objectID: 'Content_9260ffdc-e0b9-4706-a36b-beae7b7c3f2d',
    excerpt:
      'Hello, devs.\n\nToday I want to dive deep into a very specific data structure to hold a collection that\'s called Linked List.\n\nFirst I\'ll briefly explain the array problem and how linked lists came to solve those problems and then we\'ll how to implement that in JavaScript.\n\nI already can say that as a JS dev I don\'t see big use cases because we have natively a pretty decent way of handling collections. However, as a software engineer, I consider it very important to have a base understanding of it in case I need it in the future.\n\n> Knowledge is power and never useless.\n\n\n\n About Lists\n\nArrays are one of the most efficient ways of storing data collections like a list of friends on Instagram for example.\n\nIn JavaScript when we want to create a list of something, all we need is a very simple open/close square bracket (`[]`) and push as many elements you want to it.\n\nHowever in some other languages, especially the ones which are focus on performance the approach is different. There, if you need a list, you have to specify the size of your list, which sometimes is a problem because we often handle dynamic data.\n\nAnd it makes sense to have this approach. If you have little memory and need to write some code that compiles a very low machine language (like binary) if you say that your list will have only 3 elements, for example, the compiler can say:\n\n> Hey, for this list here can be allocated only a few bytes because we know in advance it\'ll only contain a max of 3 elements\n\nAlso, if you want to insert or remove an element in some specific position, you need to entirely move the list and these operations could be tedious and expensive.\n\nIn JS we don\'t suffer much about that because the language was designed in that way and we also have native array methods (very well optimized I suppose) that remove or add an element and regen the list, like the method [`Array.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).\n\n```js\nconst months = [\'Jan\', \'March\', \'April\', \'June\'];\n\n// insert exactly in the index one (1, 0) the string `Feb`\nmonths.splice(1, 0, \'Feb\');\n\nconsole.log(months); // Array ["Jan", "Feb", "March", "April", "June"]\n\n// removes everything from the index 3 til the last el ("April" and "June")\nmonths.splice(3, months.length)\n\nconsole.log(months); // ["Jan", "Feb", "March"]\n```\n\n\n\n Linked List: Concept\n\nLinked list implementation tries to solve the max number of elements we can store in a list and how to easily navigate through a list by change the data structure used from arrays to simple linked objects (node).\n\nEvery node will have 2 properties:\n\n- `element`: the data we want to store in our list;\n- `next`: a link to another node or the value null (non-existing next node).\n\nMaybe the best way to visualize it is by imagining a train.\n\nIn a train we always have the "head" which and from there it\'s connected the first "wagon", then a second "wagon" is connected to the first until the end of the train.\n\nIf we want to remove a defective wagon, for example, all we need to do is find this wagon, link the previous wagon to the next wagon, and done.\n\nThe principle is the same when we want to add a new "wagon". All we need is to find where we want to add it, connect the previous and the next wagon into the new one.\n\nIn other words, linked lists are all about creating and modifying connections between nodes.\n\nIn the next section, we\'ll step-by-step implement all those additions and removals and you\'ll that it\'s a relatively simple concept.\n\n\n\n Linked List: Implementation\n\nBefore any implementation, let\'s take a look in the API we\'ll need for this kind of list:\n\n- `.append(element)` - method used to append a new element to the end of the list;\n- `.indexOf(element)` - method used to known where in the index our element was added;\n- `.insertAt(position, element)` - method used to add an element in a specific position;\n- `.remove(element)` - method used to remove an element from the list;\n- `.removeAt(position)` - method used to remove an element in some specific position;\n- `.toString()` - method used to have an overview of our list.\n\nOnce again, instead using JS classes/prototype, I\'m going to use my favorite pattern Factory with some placeholders for our API already:\n\n```js\nfunction LinkedListFactory() {\n  return {\n    append,\n    indexOf,\n    insertAt,\n    remove,\n    removeAt,\n    toString,\n  };\n\n  function append(element) {}\n\n  function indexOf(element) {}\n\n  function insertAt(position, element) {}\n\n  function remove(element) {}\n\n  function removeAt(position) {}\n\n  function toString() {}\n}\n```\n\n "Global" variables\n\nBefore implementing the methods, we\'ll need to create 2 variables that will be used in almost all methods:\n\n- `head` - variable to hold our very first element, where everything will start. It\'ll start with the value `null`;\n- `length` - a control variable to easily hold the list size. It\'ll start with the value `0`.\n\n```js\nfunction LinkedList',
    date_timestamp: '1625097600',
    tags: [
      {
        _id: '5ef50e3e-954a-4f07-a17a-a4c95cd780dc',
        name: 'Computer Science',
        slug: 'computer-science',
      },
      {
        _id: '8db1ecbb-65fa-4526-bd3b-b33aa68c15fa',
        name: 'Data Structure',
        slug: 'data-structure',
      },
    ],
    featuredImage: {
      height: 4000,
      url: 'https://cdn.sanity.io/images/gc3hakk3/production/4ecac30d3d148098bc511364a9074ac94ebf2543-6000x4000.jpg',
      width: 6000,
    },
    language: 'en',
    slug: 'data-structure-with-javascript-linked-list',
    subtitle: 'What is and how to implement a basic linked list in JavaScript',
    title: 'Data Structure with JavaScript: Linked List',
  },
  {
    id: '826a32b0-6718-4327-a592-6da0bda52e98',
    objectID: 'Content_826a32b0-6718-4327-a592-6da0bda52e98',
    excerpt:
      "When we talk about queue as a data structure, it's exactly the same as you can imagine in real-world examples: a lot of things a line one in front of the other, waiting for something, like the imagine hero shows.\n\nIn this post, we're gonna talk about the basic implementation of a queue (like a supermarket queue), a priority queue (like a hospital queue), and also a circular queue (like a list of things you have to do repetitively).\n\n Basic Queue\n\nThe basic queue will give us the base for the other queues. Here, we need to implement a mechanism called FIFO (First In, First Out), which means the first element added will be the first to be removed.\n\nTo start, let's see the API interface we need to implement that:\n\n- `enqueue(element)` - add new element(s) to the queue;\n- `dequeue()` - remove first element from the queue;\n- `front()` - returns the first element from the queue (for checking purposes);\n- `isEmpty()` - returns if the queue is empty or not;\n- `size()` - returns how many elements the queue contains.\n\n> Keep in mind that the API might differ from different languages which have Queue native or other implementations, but the principles are the same.\n\nThere are many ways of creating this structure, some people would straight use JS class but personally, I like to use the `factory` approach.\n\nSo let's create a factory function with a placeholder for all those methods:\n\n```js\nfunction QueueFactory() {\n  const items = [];\n\n  return {\n    enqueue,\n    dequeue,\n    front,\n    isEmpty,\n    size,\n  };\n\n  function enqueue() {}\n\n  function dequeue() {}\n\n  function front() {}\n\n  function isEmpty() {}\n\n  function size() {}\n}\n```\n\n .enqueue(element)\n\nThis method will simple take an element as argument and add to the end of the list:\n\n```js\nfunction enqueue(element) {\n  items.push(element)\n}\n```\n\n .dequeue()\n\nDequeue will remove the first element of our items and return it. We can simple use `Array.prototype.shift` for that task:\n\n```js\nfunction dequeue() {\n  return items.shift();\n}\n```\n\n> Friendly reminder that shift mutates `items` array.\n\n .front()\n\nThis method will only return for visibility purposes the first element of the list:\n\n```js\nfunction front() {\n  return items[0];\n}\n```\n\n .isEmpty()\n\nAs the name says, this method will check if our queue is empty or not:\n\n```js\nfunction isEmpty() {\n  return items.length === 0;\n}\n```\n\n .size()\n\nThis will simply return the length of our list:\n\n```js\nfunction size() {\n  return items.length;\n}\n```\n\n (Optional) .print() / .queue()\n\nIt's important that we don't expose our queue as part of the public interface because the whole idea is having a custom implementation for arrays.\n\nAlso, arrays are mutable, which means that if the user (we or other devs) push has access to the reference, new elements could be pushed or removed.\n\nSo if you want to provide a method to check the entire list, you could return a copy of this list:\n\n```js\nfunction queue() {\n  return [...items];\n}\n```\n\nOr maybe a method which prints the list:\n\n```js\nfunction print() {\n  console.log(items.toString());\n  // or console.log(JSON.stringify(items))\n}\n```\n\n Final result\n\n```js\nfunction QueueFactory() {\n  const items = [];\n\n  return {\n    enqueue,\n    dequeue,\n    front,\n    isEmpty,\n    size,\n    print\n  };\n\n  function enqueue(element) {\n    items.push(element);\n  }\n\n  function dequeue() {\n    return items.shift();\n  }\n\n  function front() {\n    return items[0];\n  }\n\n  function isEmpty() {\n    return items.length === 0;\n  }\n\n  function size() {\n    return items.length;\n  }\n\n  function print() {\n    console.log(items.toString());\n  }\n}\n\n\nconst myQueue = QueueFactory();\n\nmyQueue.enqueue(3);\nmyQueue.enqueue(2);\nmyQueue.enqueue(6);\n\nconsole.log(myQueue.front()); // 3\nmyQueue.print(); // 3,2,6\n\nconsole.log(myQueue.dequeue()); // 3\nmyQueue.print(); // 2,6\n```\n\n\n\n Priority Queue\n\nIn some cases, only the basic queue isn't enough. We need that behavior but we also want to take into account priorities, like a hospital emergency queue where the worst case has the highest priority no matter when it arrives first.\n\nThe good news is that from our previous implementation, only a few changes will be necessary.\n\n Internal data structure\n\nBefore we were simply pushing the element we received from our `enqueue` method into a list.\n\n\nNow, to keep tracking which element has higher or lower priority we might want to have an internal structure, a simple object where we simply hold the element and the priority:\n\n```js\nfunction createQueueElement(element, priority) {\n  return {\n    element,\n    priority,\n  };\n}\n```\n\nNow, iniside the `enqueue` method, we have to also accept a priority, so we create our element with our internal structure:\n\n\n```js\nfunction enqueue(element, priority) {\n  const newEl = createQueueElement(element, priority);\n  \n  items.push(newEl)\n}\n```\n\nNothing has changed until here, only our internal data structure.\n\n Priority\n\nTo take into account where to add the element we'll need to loop over all items and check if ",
    date_timestamp: '1621641600',
    tags: [
      {
        _id: '5ef50e3e-954a-4f07-a17a-a4c95cd780dc',
        name: 'Computer Science',
        slug: 'computer-science',
      },
      {
        _id: '8db1ecbb-65fa-4526-bd3b-b33aa68c15fa',
        name: 'Data Structure',
        slug: 'data-structure',
      },
    ],
    featuredImage: {
      height: 3648,
      url: 'https://cdn.sanity.io/images/gc3hakk3/production/7228f4b494fc6dc189da4dd31ec908bb39659ae3-5472x3648.jpg',
      width: 5472,
    },
    language: 'en',
    slug: 'data-structure-with-javascript-queue',
    subtitle:
      'How to implement basic, priority and circular queue in JavaScript.',
    title: 'Data Structure with JavaScript: Queue',
  },
  {
    id: '80be37b1-a1d9-4931-975b-1cf4640f7f7d',
    objectID: 'Content_80be37b1-a1d9-4931-975b-1cf4640f7f7d',
    excerpt:
      'As a JavaScript developer (no matter back or front-end), we often rely upon `npm scripts` to automate common tasks like starting a server, building a project, and even performing tasks before or after certain scripts like `postbuild`, `prebuild`, etc.\n\nWhen those commands are simple like `node index.js`, having them a single line in our package.json isn\'t a problem at all. The real problem starts when we need an extensive command, adding environment variables, and concatenating commands:\n\n(Example extracted from [Material UI package.json](https://github.com/mui-org/material-ui/blob/830c18ba71af19bc0370f1eeb902f9f605144a5d/package.json))\n```json\n{\n    "scripts": {\n      "proptypes": "cross-env BABEL_ENV=development babel-node --extensions \\".tsx,.ts,.js\\" ./scripts/generateProptypes.ts",\n      "deduplicate": "node scripts/deduplicate.js",\n      "benchmark:browser": "yarn workspace benchmark browser",\n      "build:codesandbox": "lerna run --parallel --scope \\"@material-ui/*\\" build",\n      "release:version": "lerna version --exact --no-changelog --no-push --no-git-tag-version",\n      "release:build": "lerna run --parallel --scope \\"@material-ui/*\\" build",\n      "release:changelog": "node scripts/releaseChangelog",\n      "release:publish": "lerna publish from-package --dist-tag next --contents build",\n      "release:publish:dry-run": "lerna publish from-package --dist-tag next --contents build --registry=\\"http://localhost:4873/\\"",\n      "release:tag": "node scripts/releaseTag",\n      "docs:api": "rimraf ./docs/pages/api-docs && yarn docs:api:build",\n      "docs:api:build": "cross-env BABEL_ENV=development __NEXT_EXPORT_TRAILING_SLASH=true babel-node --extensions \\".tsx,.ts,.js\\" ./docs/scripts/buildApi.ts  ./docs/pages/api-docs ./packages/material-ui-unstyled/src ./packages/material-ui/src ./packages/material-ui-lab/src --apiPagesManifestPath ./docs/src/pagesApi.js",\n      "docs:build": "yarn workspace docs build",\n      "docs:build-sw": "yarn workspace docs build-sw",\n      "docs:build-color-preview": "babel-node scripts/buildColorTypes",\n      "docs:deploy": "yarn workspace docs deploy",\n      "docs:dev": "yarn workspace docs dev",\n      "docs:export": "yarn workspace docs export",\n      "docs:icons": "yarn workspace docs icons",\n      "docs:size-why": "cross-env DOCS_STATS_ENABLED=true yarn docs:build",\n      "docs:start": "yarn workspace docs start",\n      //.....\n    }\n}\n```\n\n\nBut what if I told you could have those commands extracted into a separate file and having a `scripts` config like this:\n\n```json\n{\n    "scripts": {\n      "proptypes": "scripty",\n      "deduplicate": "scripty",\n      "benchmark:browser": "scripty",\n      "build:codesandbox": "scripty",\n      "release:version": "scripty",\n      "release:build": "scripty",\n      "release:changelog": "scripty",\n      "release:publish": "scripty",\n      "release:publish:dry-run": "scripty",\n      "release:tag": "scripty",\n      "docs:api": "scripty",\n      "docs:api:build": "scripty",\n      "docs:build": "scripty",\n      "docs:build-sw": "scripty",\n      "docs:build-color-preview": "scripty",\n      "docs:deploy": "scripty",\n      "docs:dev": "scripty",\n      "docs:export": "scripty",\n      "docs:icons": "scripty",\n      "docs:size-why": "scripty",\n      "docs:start": "scripty",\n    }\n   //.....\n}\n```\n\n\n\n Scripty\n\nScripty is a npm package that enables us the ability to have executable files to run `npm scripts`.\n\nThe whole idea is to treat these giant script lines we have as code and keep our package.json clean and simple.\n\nLet\'s say we have this:\n\n```json\n{\n  "scripts": {\n    "lint": "eslint . --cache --report-unused-disable-directives --ext .js,.ts,.tsx --max-warnings 0"\n  }\n}\n\n```\n\nUsing scripty it\'ll look like this:\n\n```json\n{\n  "scripts": {\n    "lint": "scripty"\n  }\n}\n```\n\n The magic behind\n\nOf course, the command we just removed needs to be somewhere. To make it simple as that, scripty does a pairing of `<npm-script-nam>:<executable-file-name>`.\n\nIn other words, if we have an npm script called `lint`, we need an executable file called `lint`, `lint.sh`, or `lint.js`.\n\n\nThe default folder is always, at the root level, a folder called `scripts`. So, to solve the previous migration, we would create a file called `lint.sh` under the `scripts` folder, like this:\n\n\n```bash\n!/usr/bin/env bash\n\nyarn eslint . --cache --report-unused-disable-directives --ext .js,.ts,.tsx --max-warnings 0\n```\n\n Executable Bash or .JS\n\nScripty can handle only handle bash or JavaScript executables.\n\nTo have one of those, the file needs to:\n\n1. having the shebang at the top of the file (e.g. `!/bin/bash` or `!/bin/node`;\n2. having permission to execute (while `ls -la`, it needs to have `x` flag);\n\n> Quick tip, if you\'re in a UNIX environment, you can quickly give this permission by running the command `chmod u+x <file-path>`\n\n\nAlso, file extensions are not necessary. You can write a `test.sh`, `test.js` or only `test`. What will define the syntax highlight and the execution w',
    date_timestamp: '1618531200',
    tags: [
      {
        _id: '74087cc8-2774-4aa6-b39d-15f12e457351',
        name: 'JavaScript',
        slug: 'javascript',
      },
      {
        _id: '96f6acec-77a2-4940-b09d-51bb6d036f53',
        name: 'Tooling',
        slug: 'tooling',
      },
    ],
    featuredImage: {
      height: 4312,
      url: 'https://cdn.sanity.io/images/gc3hakk3/production/cde16fb7505ac11b315af8b5ca9179c284a6e6b5-6468x4312.jpg',
      width: 6468,
    },
    language: 'en',
    slug: 'how-to-have-better-npm-scripts',
    subtitle: 'A quick npm package to ease your complex npm scripts',
    title: 'How to have better NPM Scripts',
  },
];
