import React from "react";

/**
 * Bintang kelap-kelip (CSS murni, tanpa aset) — dua lapisan dengan tempo berbeda
 * agar kedipannya terasa acak. Berada di dalam curtain sehingga muncul berbarengan
 * dengan ombak ungu yang dibawa roket.
 */
const Starfield = () => {
  return (
    <>
      <div className="nf404-stars" aria-hidden />
      <div className="nf404-stars-b" aria-hidden />
    </>
  );
};

export default Starfield;
