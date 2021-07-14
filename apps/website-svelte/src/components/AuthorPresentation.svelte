<script lang="ts">
  import GithubIcon from '@components/Icons/GithubIcon.svelte';
  import TwitterIcon from '@components/Icons/TwitterIcon.svelte';
  import LinkedInIcon from '@components/Icons/LinkedInIcon.svelte';
  import siteee from 'site-data';

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
    margin-bottom: 1.75rem;
  }

  aside {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  aside h1 {
    font-family: proxima-nova, sans-serif;
    font-weight: 900;
    line-height: 1.3;
    font-size: 2.369rem;
  }

  aside p {
    font-size: 1.125rem;
    line-height: 1.3;
    margin-top: 0.625rem;
    font-family: proxima-nova, sans-serif;
  }

  a {
    display: inline-block;
    --icon-size: 24px;

    width: var(--icon-size);
    height: var(--icon-size);
  }

  figure {
    --image-size: 5rem;

    width: var(--image-size);
    height: var(--image-size);
  }

  figure img {
    width: 100%;
    border-radius: 50%;
  }

  @media screen and (min-width: 768px) {
    header {
      flex-direction: row;
    }

    aside p {
      font-size: 1.125rem;
      line-height: 1.3;
    }

    aside h1 {
      font-size: 3.157rem;
    }

    figure {
      --image-size: 8rem;
    }
    aside {
      max-width: 75%;
      margin-top: 0px;
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
