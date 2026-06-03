import path from "node:path";

function toPosixPath(value: string) {
  return value.replace(/\\/g, "/");
}

function toSqliteUrl(filePath: string) {
  const normalized = toPosixPath(filePath);

  if (/^[A-Za-z]:\//.test(normalized)) {
    return `file:/${normalized}`;
  }

  return normalized.startsWith("/") ? `file:${normalized}` : `file:${normalized}`;
}

const defaultProductionDataRoot = "/var/data";
const defaultDevelopmentDataRoot = path.join(process.cwd(), ".data");

export const dataRootDir =
  process.env.DATA_ROOT_DIR ??
  (process.env.NODE_ENV === "production"
    ? defaultProductionDataRoot
    : defaultDevelopmentDataRoot);

export const databaseFilePath = path.join(dataRootDir, "blog.db");

export const databaseUrl =
  process.env.DATABASE_URL ??
  (process.env.NODE_ENV === "production"
    ? toSqliteUrl(databaseFilePath)
    : "file:./dev.db");

export const uploadRootDir =
  process.env.UPLOAD_ROOT_DIR ?? path.join(dataRootDir, "uploads");

export const mediaBasePath = "/media";
