export const data = {
  _id: '5f390975f5ec161249bd8cdf',
  tag: 'Front end',
  createdAt: '2020-08-16T10:24:53.957Z',
  updatedAt: '2020-08-18T15:32:50.358Z',
  __v: 0,
  slug: 'front-end',
  name: 'Front End',
  blog_posts: [
    {
      language: 'en',
      status: 'Published',
      post_tags: [
        '5f390975f5ec161249bd8cdf',
        '5f39098ef5ec161249bd8ce0',
        '5f39642d2163ea002152ca9c',
        '5f3948d4e57aa266137e0ffc',
      ],
      _id: '5f3eaabd8d32c410783fbe9b',
      is_shown: true,
      slug: 'cache-gatsby-github-actions',
      date: '2020-04-28',
      featured_image_caption: '',
      subtitle: 'A quick setup to increase your build performance',
      title: 'Gatsby Incremental Builds and Github Actions',
      content:
        'Hey, devs. How is it going during this quarantine? Hope you’re not getting crazy like I\'m 😬.\n\nToday I’d like to bring to you a new feature announced on April 22 by Gatsby team: **Incremental builds**.\n\n<TwitterCard>\n  <p lang="en" dir="ltr">\n    📣BIG NEWS: Introducing Incremental Builds!\n    <br />\n    <br />\n    ➡️<a href="https://t.co/6yYouf0kU4">https://t.co/6yYouf0kU4</a>\n    <br />\n    <br /> ✅Only build the content that&#39;s changed\n    <br /> 🚀Real-time builds\n    <br /> 😍Marketers and developers are both happy\n    <br />\n    <br />\n    Now, harness the powerful benefits of being totally dynamic AND fully\n    static. <a href="https://t.co/WHNw35DlSE">pic.twitter.com/WHNw35DlSE</a>\n  </p>\n  &mdash; Gatsby (@GatsbyJS){" "}\n  <a href="https://twitter.com/GatsbyJS/status/1252991368005324800?ref_src=twsrc%5Etfw">\n    April 22, 2020\n  </a>\n</TwitterCard>\n\nTo follow this guide you will need to know about Gatsby (of course) but also a bit of knowledge of using Github Actions. I won’t dive deep in the details of how to set up a CI environment using it so it’s important to at least have the basics.\n\n---\n\n## Gatsby bottleneck\n\nGatsby is an amazing toolkit to create static websites using React or maybe set up your JAM (JavaScript, API, and Markup) application. Everything works fine, you can find a bunch of plugins to avoid infrastructure code and the concepts are relatively easy to understand since their documentation is well written and has details about almost everything.\n\nThe problem starts as soon as your website starts to have a lot of pages or maybe like my blog, you have a lot of images that need to be processed and compressed to ship a good experience for those who are reading it.\n\nWhen I start my blog, a build would take approximately less than 2 minutes. After migrating my posts from Medium, in the CI it usually takes from 6 to 8 minutes. As you can imagine, as many posts, images, and data you have I add, as slower my build command becomes.\n\n---\n\n## Incremental Build\n\nOf course, I’m not the only one having this issue. The Gatsby community and adoption are becoming bigger every year given all benefits which it brings for us, developers.\n\nKnowing that they just released a feature called Incremental Build.\n\nThe name is self-explanatory I imagine, you’ll only build/generate what have been changed.\n\nLet’s imagine you have a website which has 2 pages, home and about. Then you change something on the “About” page and want to ship it. Does it make sense to build both pages? You only have changed in one. It’s a waste of time and resources.\n\nWith this flag, it’ll check all files previously generated and understand what needs to be built.\n\nAnother nice benefit of it is if you’re using a CMS which triggers a build for each change you’ve made in a post, page, or any data, you’ll see almost immediately your change live and this is sick!\n\n---\n\n## How it works\n\nIf you check their docs, it already has a page under the “improve performance” section which explains what’s the feature and how it works.\n\nIn a nutshell, when you run `yarn gatsby build`, it generates 2 folders:\n\n1. `public/`. Here it’s your website. Is the folder you need to host in a web server (e.g. Github Pages, Netlify, etc.)\n1. `.cache/`. Here it’s all files cached to speed up the building process.\n\nMy first thought was: “Ok, I only need to persist cache and everything will work” but reading till the end they made clear: Both pages need to be persisted.\n\n> Note that until this date I’m writing this post, this feature does not work for `gatsby develop`\n\n---\n\n## My problem\n\nWell, I already explained a bit about my problem: I have tons of images to be processed and a bunch of posts already.\n\nEven when I’m working by myself, I like to create feature branches for my projects just because I can easily revert code or decisions I made by just pressing a button on Github.\n\nSo, imagine the situation. I create a feature branch, do my changes and apart from the pipeline saying to me: “Hey, lint, tests, and build are working fine, ship it”, I like to see a live preview that Netlify offers to me.\n\nThe first time takes 8 minutes.\n\nThen when I see it online, I notice that I forgot to see something. I fix it and push. Another 8 minutes.\n\nAnother case I have is when dependabot creates a PR for me from a major version or maybe I’m using a beta version from some dependency like I’m doing right now with framer-motion.\n\nThe pipeline will say it’s green but I still want to check the live preview and be sure that the change won’t affect the experience I want for my website.\n\nWhen the Gatsby team announced, they (for obvious reasons) did an ad for their cloud platform, Gatsby Cloud.\n\nI have to confess that I was planning on moving there until I realized that when you connect Gatsby Cloud with Github, it has a bug (it might be already fixed) that does not update the stats of “build” to “done”.\n\nAfter that, I just had one option, making it work for Github Actions.\n\nFirst I tried to Google to see if people already had solved this problem but I couldn’t find anything. Maybe because it’s new, maybe because google search didn’t rank well yet.\n\nEven not being a CI expert, I have figured out a bunch of stuff by myself reading official docs and inspecting how people set up in open-source projects (pro tip), then I just decided to try by myself.\n\n---\n\n## Setting it up\n\nTo enable this feature, be sure you have installed gatsby version 2.20.4 or higher.\n\nAfter that, you need to specify an environment variable named **GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES** to true in your build context, like:\n\n```shell\nGATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true yarn gatsby build\n```\n\nIf you want to see what pages have been changed, you can pass the flag `--log-pages` at the end of the command.\n\nIn your Github Actions config, you can just add this variable inside “env” context in the build step:\n\n```yml\n# CI setup, Install dependencies, lint and tests...\n      - run: yarn build --log-pages\n        name: Build\n        env:\n          GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES: true\n          NODE_ENV: production\n            CI: true\n```\n\n> Note that my `build` script is a simpler version of `gatsby build`.\n\nAwesome. The flag will be available when run build.\n\nNow, we need to, somehow, create a CI cache for both `public` and `.cache`.\n\nTo do that I’ll use a pre-built action called, guess what, “cache”.\n\nIn their docs they give a bunch of explanations how to use, not that complicated, here is the code:\n\n```yml\n# CI Setup\n- name: Gatsby Cache Folder\n  uses: actions/cache@v1\n  id: gatsby-cache-folder\n  with:\n    path: .cache\n    key: ${{ runner.os }}-cache-gatsby\n    restore-keys: |\n      ${{ runner.os }}-cache-gatsby\n\n- name: Gatsby Public Folder\n  uses: actions/cache@v1\n  id: gatsby-public-folder\n  with:\n    path: public/\n    key: ${{ runner.os }}-public-gatsby\n    restore-keys: |\n      ${{ runner.os }}-public-gatsby\n\n# Install dependencies, lint, test and build...\n```\n\nBoth steps are the same, it changes what’s going to be cached.\n\nThe important pieces of this code are:\n\n- path: which folder you want to cache;\n- key: the name of your cache. In this case, I just copied from my yarn cache. In the end, it will be `Linux-cache-gatsby` and `Linux-public-gatsby` but it can be whatever you want to define.\n\nRestore keys are not that important for this case (maybe for now) but in a nutshell, it defines a list of cache priorities to pick. Imagine you have more caches like `Linux-cache-gatsby-4983b10b` (with a hash), you can say something like:\n\n```yml\nrestore-keys: |\n  ${{ runner.os }}-public-gatsby-4983b10b\n  ${{ runner.os }}-public-gatsby\n```\n\nIf the first isn’t available, it’ll pick the second or it’ll define that it has no cache.\n\nAnd that’s it. This is all you need to make it work.\n\nHere\'s my final file:\n\n```yml:title=ci.yml\nname: Node.js CI\n\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    steps:\n      - uses: actions/checkout@v2\n      - uses: actions/setup-node@v1\n        with:\n          node-version: 12\n\n      - name: Yarn cache directory\n        id: yarn-cache-dir\n        run: echo "::set-output name=dir::$(yarn cache dir)"\n\n      - name: Yarn cache\n        uses: actions/cache@v1\n        id: yarn-cache\n        with:\n          path: ${{ steps.yarn-cache-dir.outputs.dir }}\n          key: ${{ runner.os }}-yarn-${{ hashFiles(\'**/yarn.lock\') }}\n          restore-keys: |\n            ${{ runner.os }}-yarn-\n\n      # In order to make gatsby incremental build works, it\'s necessary .cache\n      # and public folder.\n      - name: Gatsby Cache Folder\n        uses: actions/cache@v1\n        id: gatsby-cache-folder\n        with:\n          path: .cache\n          key: ${{ runner.os }}-cache-gatsby\n          restore-keys: |\n            ${{ runner.os }}-cache-gatsby\n\n      - name: Gatsby Public Folder\n        uses: actions/cache@v1\n        id: gatsby-public-folder\n        with:\n          path: public/\n          key: ${{ runner.os }}-public-gatsby\n          restore-keys: |\n            ${{ runner.os }}-public-gatsby\n\n      - run: yarn install --pure-lockfile\n        name: Install dependencies\n\n      - run: yarn lint\n        name: Run ESLint\n\n      - run: yarn jest --color\n        name: Run Test\n        env:\n          CI: true\n\n      - run: yarn build --log-pages\n        name: Build\n        env:\n          # incremental builds\n          # https://www.gatsbyjs.org/docs/page-build-optimizations-for-incremental-data-changes/\n          GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES: true\n          NODE_ENV: production\n          ENVIRONMENT: ${{ contains(github.ref, \'master\') && \'production\' || \'staging\'}}\n          GATSBY_ALGOLIA_APP_ID: ${{ secrets.GATSBY_ALGOLIA_APP_ID }}\n          GATSBY_ALGOLIA_SEARCH_KEY: ${{ secrets.GATSBY_ALGOLIA_SEARCH_KEY }}\n          ALGOLIA_ADMIN_KEY: ${{ secrets.ALGOLIA_ADMIN_KEY }}\n          GATSBY_ALGOLIA_INDEX_NAME: ${{ secrets.GATSBY_ALGOLIA_INDEX_NAME }}\n\n      - name: Deploy to Netlify\n        uses: nwtgck/actions-netlify@v1.0\n        with:\n          publish-dir: \'./public\'\n          production-branch: master\n          deploy-message: \'Deploy from GitHub Actions\'\n        env:\n          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}\n          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}\n```\n\n---\n\n## Results\n\nBefore I show you the benefits I had on my CI, I want to show you how awesome it’s even locally.\n\nWhen I remove both `.cache` and `public` folder:\n\n```txt\nDone building in 159.0597712 sec\n```\n\nThen if I run with the flag and ask to log, it’ll be:\n\n```txt\ninfo Built pages:\nUpdated page: /offline-plugin-app-shell-fallback/\nUpdated page: /2020/03/dev-js-9\nUpdated page: /en/2020/03/yml-for-fe\nUpdated page: /\nUpdated page: /2019/04/things-i-dont-know-2018\nUpdated page: /2020/03/13/corona-virus-overview\nUpdated page: /2019/03/netlifiy-deploy\nUpdated page: /2018/09/dev-js-8\nUpdated page: /2018/07/it-and-english\nUpdated page: /2018/05/dev-js-7-2\nUpdated page: /2018/04/dev-js-7-1\nUpdated page: /2018/02/dev-js-5-1\nUpdated page: /2018/02/dev-js-5-2\nUpdated page: /2018/01/css-position\nUpdated page: /2018/02/dev-js-6\nUpdated page: /2018/01/dev-js-4\nUpdated page: /2018/01/dev-js-3-2\nUpdated page: /2017/12/dev-js-part-3\nUpdated page: /2017/12/dev-js-part-2\nUpdated page: /2017/12/dev-js-part-1\nUpdated page: /2017/09/deploy-fe-with-surge\nUpdated page: /2017/08/deploy-fe-with-gh-pages\nUpdated page: /2017/07/franz\nUpdated page: /2017/07/regex-part-7\nUpdated page: /2017/06/regex-part-6\nUpdated page: /2017/06/regex-part-5\nUpdated page: /2017/06/regex-part-4\nUpdated page: /2017/05/regex-part-3\nUpdated page: /2017/05/regex-part-2\nUpdated page: /2017/05/regex-part-1\nUpdated page: /2017\nUpdated page: /2018\nUpdated page: /2019\nUpdated page: /2020\nUpdated page: /2020/03\nUpdated page: /2019/03\nUpdated page: /2019/01\nUpdated page: /2018/09\nUpdated page: /2018/07\nUpdated page: /2018/05\nUpdated page: /2018/04\nUpdated page: /2018/02\nUpdated page: /2018/01\nUpdated page: /2017/12\nUpdated page: /2017/09\nUpdated page: /2017/08\nUpdated page: /2017/07\nUpdated page: /2017/06\nUpdated page: /2017/05\nUpdated page: /404/\nUpdated page: /search/\nUpdated page: /uses/\nUpdated page: /404.html\nDone in 23.01s.\n```\n\nThat’s nice but, what about the CI? Did it have some improvements?\n\nThe following image if from a PR opened by dependabot before I implement cache strategy + incremental builds:\n\n![cache-gatsby-github-actions-before-caching.png](https://res.cloudinary.com/duzei21zt/image/upload/v1597942390/site/cache_gatsby_github_actions_before_caching_53c4b8662c.png)\n\nThe next one is after implementing the strategy:\n\n![cache-gatsby-github-actions-after-caching.png](https://res.cloudinary.com/duzei21zt/image/upload/v1597942390/site/cache_gatsby_github_actions_after_caching_a1efa17632.png)\n\n---\n\n## Conclusion\n\nI’m still figuring out if there are some better strategies to do all this caching thingy, but I already can say that I’m pretty happy with the final results.\n\nI assume is that this feature is only at the beginning. Have you noticed that the flag has named with "EXPERIMENTAL"? As soon they get more and more builds and examples in different repos they will enhance this more and more.\n\nAnyways, I hope I could help you a bit in case you’re also having issues with that. You can find below all links from all resources I used and also the link to my project!\n\n---\n\n## Resources\n\n- [This blog repo](https://github.com/raulfdm/raulmelo.dev)\n- [Oficial feature announcement](https://www.gatsbyjs.org/blog/2020-04-22-announcing-incremental-builds/)\n- [Gatsby Incremental build documentation](https://www.gatsbyjs.org/docs/page-build-optimizations-for-incremental-data-changes/)\n- [JAM stack](https://jamstack.org/)\n- [Actions/cache](https://github.com/marketplace/actions/cache)\n\n\n',
      description:
        'Using new gatsby partial builds to speed up our build time.',
      createdAt: '2020-08-20T16:54:21.867Z',
      updatedAt: '2020-11-08T20:29:42.062Z',
      __v: 0,
      featured_image: {
        _id: '5f3eaa7c8d32c410783fbe9a',
        name: 'cache-gatsby-github-actions-featured-img.png',
        alternativeText: '',
        caption: '',
        hash: 'cache_gatsby_github_actions_featured_img_844a0fe924',
        ext: '.png',
        mime: 'image/png',
        size: 259.87,
        width: 1920,
        height: 889,
        url:
          'https://res.cloudinary.com/duzei21zt/image/upload/v1597942390/site/cache_gatsby_github_actions_featured_img_844a0fe924.png',
        provider_metadata: {
          public_id: 'site/cache_gatsby_github_actions_featured_img_844a0fe924',
          resource_type: 'image',
        },
        formats: {
          thumbnail: {
            name: 'thumbnail_cache-gatsby-github-actions-featured-img.png',
            hash:
              'thumbnail_cache_gatsby_github_actions_featured_img_844a0fe924',
            ext: '.png',
            mime: 'image/png',
            width: 245,
            height: 113,
            size: 17.49,
            path: null,
            url:
              'https://res.cloudinary.com/duzei21zt/image/upload/v1597942391/site/thumbnail_cache_gatsby_github_actions_featured_img_844a0fe924.png',
            provider_metadata: {
              public_id:
                'site/thumbnail_cache_gatsby_github_actions_featured_img_844a0fe924',
              resource_type: 'image',
            },
          },
          large: {
            name: 'large_cache-gatsby-github-actions-featured-img.png',
            hash: 'large_cache_gatsby_github_actions_featured_img_844a0fe924',
            ext: '.png',
            mime: 'image/png',
            width: 1000,
            height: 463,
            size: 153.19,
            path: null,
            url:
              'https://res.cloudinary.com/duzei21zt/image/upload/v1597942393/site/large_cache_gatsby_github_actions_featured_img_844a0fe924.png',
            provider_metadata: {
              public_id:
                'site/large_cache_gatsby_github_actions_featured_img_844a0fe924',
              resource_type: 'image',
            },
          },
          medium: {
            name: 'medium_cache-gatsby-github-actions-featured-img.png',
            hash: 'medium_cache_gatsby_github_actions_featured_img_844a0fe924',
            ext: '.png',
            mime: 'image/png',
            width: 750,
            height: 347,
            size: 96.65,
            path: null,
            url:
              'https://res.cloudinary.com/duzei21zt/image/upload/v1597942394/site/medium_cache_gatsby_github_actions_featured_img_844a0fe924.png',
            provider_metadata: {
              public_id:
                'site/medium_cache_gatsby_github_actions_featured_img_844a0fe924',
              resource_type: 'image',
            },
          },
          small: {
            name: 'small_cache-gatsby-github-actions-featured-img.png',
            hash: 'small_cache_gatsby_github_actions_featured_img_844a0fe924',
            ext: '.png',
            mime: 'image/png',
            width: 500,
            height: 232,
            size: 50.23,
            path: null,
            url:
              'https://res.cloudinary.com/duzei21zt/image/upload/v1597942395/site/small_cache_gatsby_github_actions_featured_img_844a0fe924.png',
            provider_metadata: {
              public_id:
                'site/small_cache_gatsby_github_actions_featured_img_844a0fe924',
              resource_type: 'image',
            },
          },
        },
        provider: 'cloudinary',
        related: ['5f3eaabd8d32c410783fbe9b'],
        createdAt: '2020-08-20T16:53:16.211Z',
        updatedAt: '2020-08-20T16:54:21.971Z',
        __v: 0,
        id: '5f3eaa7c8d32c410783fbe9a',
      },
      id: '5f3eaabd8d32c410783fbe9b',
    },
  ],
  id: '5f390975f5ec161249bd8cdf',
};

export const expectedData = {
  slug: 'front-end',
  name: 'Front End',
  blog_posts: [
    {
      language: 'en',
      slug: 'cache-gatsby-github-actions',
      date: '2020-04-28',
      subtitle: 'A quick setup to increase your build performance',
      title: 'Gatsby Incremental Builds and Github Actions',
      description:
        'Using new gatsby partial builds to speed up our build time.',
      featured_image: {
        width: 1920,
        height: 889,
        url:
          'https://res.cloudinary.com/duzei21zt/image/upload/v1597942390/site/cache_gatsby_github_actions_featured_img_844a0fe924.png',
      },
      id: '5f3eaabd8d32c410783fbe9b',
    },
  ],
  id: '5f390975f5ec161249bd8cdf',
};
