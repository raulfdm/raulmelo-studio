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
  <aside class="info">
    <h1 class="author-name">
      {personalInformation.full_name}
    </h1>
    <p class="description">
      {defaultSeo?.description}
    </p>
    <section class="socials">
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
  <figure class="profile-picture">
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

  .info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  .socials {
    display: flex;
    padding-top: 1.25rem;
    flex: 1;
    opacity: 0.9;
  }

  .socials a {
    display: inline-block;
    --icon-size: 24px;

    color: var(--color-secondary);

    width: var(--icon-size);
    height: var(--icon-size);
  }

  .socials a:not(:first-child) {
    margin-left: 1rem;
  }

  .author-name {
    font-family: var(--font-sans);
    font-weight: 900;
    line-height: 1.3;
    font-size: 2.369rem;
  }

  .description {
    font-size: 1.125rem;
    line-height: 1.3;
    margin-top: 0.625rem;
    font-family: var(--font-sans);
  }

  .profile-picture {
    --image-size: 5rem;

    width: var(--image-size);
    height: var(--image-size);
  }

  .profile-picture img {
    width: 100%;
    border-radius: 50%;
  }

  @media screen and (min-width: 768px) {
    header {
      flex-direction: row;
    }

    .description {
      font-size: 1.125rem;
      line-height: 1.3;
    }

    .author-name {
      font-size: 3.157rem;
    }

    .profile-picture {
      --image-size: 8rem;
    }
    .info {
      max-width: 75%;
      margin-top: 0px;
    }
  }

  @media screen and (min-width: 1024px) {
    .author-name {
      font-size: 4.209rem;
    }

    .socials a {
      --icon-size: 32px;
    }
  }
</style>
