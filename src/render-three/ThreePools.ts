import * as THREE from 'three';

export class ThreeObjectCache {
  private readonly objectById = new Map<string, THREE.Object3D>();
  private readonly templateById = new Map<string, string>();

  get(objectId: string): THREE.Object3D | undefined {
    return this.objectById.get(objectId);
  }

  set(objectId: string, templateId: string, object: THREE.Object3D): void {
    this.objectById.set(objectId, object);
    this.templateById.set(objectId, templateId);
  }

  getTemplateId(objectId: string): string | undefined {
    return this.templateById.get(objectId);
  }

  entries(): IterableIterator<[string, THREE.Object3D]> {
    return this.objectById.entries();
  }

  delete(objectId: string): void {
    this.objectById.delete(objectId);
    this.templateById.delete(objectId);
  }

  clear(): void {
    this.objectById.clear();
    this.templateById.clear();
  }
}
