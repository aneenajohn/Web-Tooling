import addons, { types } from "@storybook/addons";
import React, { useState } from "react";
import { AddonPanel } from "@storybook/components";
import { useParameter } from "@storybook/api";

addons.register("user-permission", () => {
  addons.add("user-permission/panel", {
    type: types.PANEL,
    title: "User Permission",
    render: ({ active, key }) => {
      const [permissions, setPermissions] = useState({});
      const requiredPermission = useParameter("requiredPermission", "");


      if (JSON.stringify(permissions) === "{}") {
        navigator.permissions
          .query({ name: requiredPermission })
          .then((permissionStatus) => {
            setPermissions({
              ...permissions,
              [requiredPermission]: permissionStatus.state,
            });
          });
      }
      
      return (
        <AddonPanel active={active} key={key}>
          <div>
            <h3>Permissions</h3>
            {Object.keys(permissions).map((p, i) => {
              return (<h4 key={i}>
                {p}: {permissions[p]}
              </h4>);
            })}
          </div>
        </AddonPanel>
      );
    },
  });
});
