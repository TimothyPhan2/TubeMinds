"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";

export default function SchematicWrapped({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0].emailAddress ??
      user?.id;

    if (user?.id) {
      identify({
        //Company lvl key
        company: {
          keys: {
            id: user.id,
          },
          name: userName,
        },

        // User lvl key
        keys: {
          id: user.id,
        },
        name: userName,
      });
    }
  }, [user, identify]);
  return children;
}
