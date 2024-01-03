import { Card } from "@/lib/components/card";
import { Button } from "@/lib/components/button";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export default async function ({ params }: { params: { domain: string } }) {
  const domain = params.domain.split(".")[0] ?? "home";

  let data;

  if (domain === "home") {
    const homeData = await db.query.sites.findMany({
      with: {
        products: true,
      },
    });
    data = (
      <div className="flex flex-col gap-3">
        {homeData.map((site) => (
          <div>
            <h2 className="mb-2 capitalize">{site.name}</h2>
            <div className="flex flex-col gap-3">
              {site.products.map((product) => (
                <Card className="mx-auto flex w-full max-w-[800px] flex-col p-3">
                  <div className="flex gap-2">
                    <div className="mb-2 flex flex-col gap-1">
                      <h3 className="text text-xl font-bold">User {product.name}</h3>
                      <p className="text-sm text-slate-400">
                        {product.authorName} • {product.version}
                      </p>
                    </div>
                  </div>
                  <p className="mb-3 line-clamp-5 break-words text-sm">
                    {product.description}
                  </p>
                  <Button
                    className="ml-auto mt-auto block h-9 w-[177px] p-0 text-sm font-bold normal-case hover:bg-black hover:text-white"
                    variant="default"
                  >
                    Request Private Offer
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else if (domain !== "home") {
    const res = await db.query.sites.findFirst({
      where: (sites) => eq(sites.name, domain),
      with: {
        products: true,
      },
    });
    data = (
      <>
        {res?.products.map((product) => (
          <Card className=" flex flex-col p-3">
            <div className="flex gap-2">
              <div className="mb-2 flex flex-col gap-1">
                <h3 className="text text-xl font-bold">{product.name}</h3>
                <p className="text-sm text-slate-400">
                  {product.authorName} • {product.version}
                </p>
              </div>
            </div>
            <p className="mb-3 line-clamp-5 break-words text-sm">
              {product.description}
            </p>
            <Button
              className="ml-auto mt-auto block h-9 w-[177px] p-0 text-sm font-bold normal-case hover:bg-black hover:text-white"
              variant="default"
            >
              Request Private Offer
            </Button>
          </Card>
        ))}
      </>
    );
  } else {
    return <div className="text-center text-xl font-semibold capitalize">
    there is no such marketplace
  </div>
  }

  return (
    <div className="mx-auto w-full max-w-[800px]">
      <div className="flex flex-col gap-3">
        {data}
      </div>
    </div>
  );
}
