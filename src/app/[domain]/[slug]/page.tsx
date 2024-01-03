'use client'

import { useSession } from "next-auth/react";
export default  function Slug() {
  const { data } = useSession();

  return (
    <div>
      {JSON.stringify(data)}
      <div>slug here</div>
    </div>
  );
}
