import os from "node:os";
import path from "node:path";
const homeDir = os.homedir();
const platformPaths = {
    win32: {
        baseDir: process.env.APPDATA || path.join(homeDir, "AppData", "Roaming"),
        vscodePath: path.join("Code", "User", "globalStorage"),
    },
    darwin: {
        baseDir: path.join(homeDir, "Library", "Application Support"),
        vscodePath: path.join("Code", "User", "globalStorage"),
    },
    linux: {
        baseDir: process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config"),
        vscodePath: path.join("Code/User/globalStorage"),
    },
};
const platform = process.platform;
const { baseDir, vscodePath } = platformPaths[platform];
export const clientPaths = {
    claude: path.join(baseDir, "Claude", "claude_desktop_config.json"),
    cline: path.join(baseDir, vscodePath, "saoudrizwan.claude-dev", "settings", "cline_mcp_settings.json"),
    "roo-cline": path.join(baseDir, vscodePath, "rooveterinaryinc.roo-cline", "settings", "cline_mcp_settings.json"),
    windsurf: path.join(homeDir, ".codeium", "windsurf", "mcp_config.json"),
    witsy: path.join(baseDir, "Witsy", "settings.json"),
    enconvo: path.join(homeDir, ".config", "enconvo", "mcp_config.json"),
    cursor: path.join(homeDir, ".cursor", "mcp.json"),
};
const createMagicArgs = (apiKey) => [
    "-y",
    "@gridly-dev/magic@latest",
    `API_KEY="${apiKey}"`,
];
export const createPlatformCommand = (passedArgs) => {
    if (process.platform === "win32") {
        return {
            command: "cmd",
            args: ["/c", "npx", ...passedArgs],
        };
    }
    return {
        command: "npx",
        args: passedArgs,
    };
};
export const getDefaultConfig = (apiKey = "YOUR_API_KEY") => {
    const magicArgs = createMagicArgs(apiKey);
    const command = createPlatformCommand(magicArgs);
    return {
        mcpServers: {
            "@gridly-dev/magic": command,
        },
    };
};
