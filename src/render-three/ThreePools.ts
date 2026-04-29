import * as THREE from 'three';

export class ThreeObjectCache {
  private readonly objectById = new Map<string, THREE.Object3D>();
  private readonly templateById = new Map<string, string>();
  private readonly templateVersionById = new Map<string, number>();

  get(objectId: string): THREE.Object3D | undefined {
    return this.objectById.get(objectId);
  }

  set(objectId: string, templateId: string, templateVersion: number, object: THREE.Object3D): void {
    this.objectById.set(objectId, object);
    this.templateById.set(objectId, templateId);
    this.templateVersionById.set(objectId, templateVersion);
  }

  getTemplateId(objectId: string): string | undefined {
    return this.templateById.get(objectId);
  }

  getTemplateVersion(objectId: string): number | undefined {
    return this.templateVersionById.get(objectId);
  }

  entries(): IterableIterator<[string, THREE.Object3D]> {
    return this.objectById.entries();
  }

  delete(objectId: string): void {
    this.objectById.delete(objectId);
    this.templateById.delete(objectId);
    this.templateVersionById.delete(objectId);
  }

  clear(): void {
    this.objectById.clear();
    this.templateById.clear();
    this.templateVersionById.clear();
  }
}
