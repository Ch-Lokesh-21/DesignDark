import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import Constants from "@/data/Constants";
import { githubLight } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
function CodeEditor({ codeResp, isReady }: any) {
  return (
    <div className="h-80vh bg-gray-100 rounded-lg">
      {isReady ? (
        <Sandpack
          theme={githubLight}
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showLineNumbers: true,
            showInlineErrors: true,
            showTabs: true,
            editorHeight: "80vh",
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          files={{
            "/App.js": `${codeResp}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          theme={githubLight}
          files={{
            "/App.js": {
              code: `${codeResp}`,
              active: true,
            },
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "80vh" }} showLineNumbers={true} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditor;
