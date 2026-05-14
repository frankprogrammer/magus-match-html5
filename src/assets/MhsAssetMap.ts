import {
  AssetManifest,
  type AssetManifestEntry,
  type MhsCorrectiveRotationDeg,
  type MhsStaticRefKind,
  type MhsTemplateKind,
  type SourceFormat,
} from './AssetManifest';

export interface MhsAssetDeclaration {
  id: string;
  staticRefKind: MhsStaticRefKind;
  templateKind: MhsTemplateKind;
  futureMhsPath: string;
  browserUrl: string;
  sourceFormat?: SourceFormat;
  correctiveRotationDeg?: MhsCorrectiveRotationDeg;
  actorTargetHeight?: number;
  browserOnly?: boolean;
  notes?: string;
}

type MappedAssetManifestEntry = AssetManifestEntry & {
  futureMhsPath: string;
  mhsStaticRefKind: MhsStaticRefKind;
  mhsTemplateKind: MhsTemplateKind;
};

export const MhsAssetMap: Record<string, MhsAssetDeclaration> = Object.fromEntries(
  Object.values(AssetManifest)
    .filter(isMappedAssetManifestEntry)
    .map((entry) => [
      entry.id,
      {
        id: entry.id,
        staticRefKind: entry.mhsStaticRefKind,
        templateKind: entry.mhsTemplateKind,
        futureMhsPath: entry.futureMhsPath,
        browserUrl: entry.browserUrl,
        sourceFormat: entry.sourceFormat,
        correctiveRotationDeg: entry.correctiveRotationDeg,
        actorTargetHeight: entry.actorTargetHeight,
        browserOnly: entry.browserOnly,
        notes: entry.notes,
      },
    ]),
);

export function getMhsAssetDeclaration(assetId: string): MhsAssetDeclaration | undefined {
  return MhsAssetMap[assetId];
}

function isMappedAssetManifestEntry(entry: AssetManifestEntry): entry is MappedAssetManifestEntry {
  return (
    entry.futureMhsPath != null &&
    entry.mhsStaticRefKind != null &&
    entry.mhsTemplateKind != null
  );
}
