export const DotDivider = (props: React.ComponentPropsWithoutRef<'hr'>) => (
  <>
    <hr className="italic text-2xl my-5" {...props} />
    <style jsx>{`
      hr {
        border-color: transparent;
        position: relative;
        overflow: visible;
        text-align: center;
      }
      hr::before {
        content: '...';
        letter-spacing: 0.6em;
        position: relative;
        top: -26px;
      }
    `}</style>
  </>
);
