<script lang="ts">
  import GithubIcon from './Icons/GithubIcon.svelte';
  const siteData = {
    personalInformation: {
      full_name: 'Raul Melo',
      profile_pic: {
        url: '',
      },
    },
  };

  const defaultSeo = {
    description: 'foo bar',
  };

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
    <h1 data-testid="author__name">
      {siteData.personalInformation.full_name}
    </h1>
    <p data-testid="author__description">
      {defaultSeo?.description}
    </p>
    <section>
      <a href={github.url}>
        <GithubIcon />
      </a>
      <a href={twitter.url}>
        <!-- <TwitterIcon css={styles.content.icons.icon} /> -->
      </a>
      <a href={linkedIn.url}>
        <!-- <LinkedInIcon css={styles.content.icons.icon} /> -->
      </a>
    </section>
  </aside>
  <figure>
    <img src={siteData.personalInformation.profile_pic.url} alt="stuff" />
  </figure>
</header>

<style>
  header {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    grid-column: 1/-1;
  }

  a {
    display: inline-block;
    --icon-size: 24px;

    width: var(--icon-size);
    height: var(--icon-size);
  }

  @media screen and (min-width: 1024px) {
    a {
      --icon-size: 32px;
    }
  }
</style>
