export const PreviewBanner = () => {
  return (
    <div className="flex justify-center px-6 py-4 text-lg bg-yellow-300 col-span-full dark:text-black">
      <p>
        This is <strong>Preview Mode</strong>.
      </p>
      <p>
        You can turn it off by{' '}
        <a className="underline" href="/api/exit-preview">
          clicking here
        </a>
        .
      </p>
    </div>
  );
};
