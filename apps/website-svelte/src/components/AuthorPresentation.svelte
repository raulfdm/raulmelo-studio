<script lang="ts">
  import GithubIcon from './Icons/GithubIcon.svelte';
  import TwitterIcon from './Icons/TwitterIcon.svelte';
  import LinkedInIcon from './Icons/LinkedInIcon.svelte';
  import siteee from 'site-data';
  console.log(siteee);

  const { personalInformation, defaultSeo: allDefaultSeo, socials } = siteee;

  const defaultSeo = allDefaultSeo['en'];

  socials;

  const github = {
    url: '',
  };
  const twitter = {
    url: '',
  };
  const linkedIn = {
    url: '',
  };
</script>

<header>
  <aside>
    <h1>
      {personalInformation.full_name}
    </h1>
    <p>
      {defaultSeo?.description}
    </p>
    <section>
      <a href={github.url}>
        <GithubIcon />
      </a>
      <a href={twitter.url}>
        <TwitterIcon />
      </a>
      <a href={linkedIn.url}>
        <LinkedInIcon />
      </a>
    </section>
  </aside>
  <figure>
    <img src={personalInformation.profile_pic.url} alt="stuff" />
  </figure>
</header>

<style>
  header {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    grid-column: 1/-1;
  }

  h1 {
    font-family: proxima-nova, sans-serif;
    font-weight: 900;
    line-height: 1.3;
    font-size: 2.369rem;
  }

  a {
    display: inline-block;
    --icon-size: 24px;

    width: var(--icon-size);
    height: var(--icon-size);
  }

  @media screen and (min-width: 768px) {
    h1 {
      font-size: 3.157rem;
    }
  }

  @media screen and (min-width: 1024px) {
    h1 {
      font-size: 4.209rem;
    }

    a {
      --icon-size: 32px;
    }
  }
</style>
