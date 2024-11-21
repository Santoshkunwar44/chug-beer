var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, } from "typeorm";
let Entry = class Entry extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid") // Generates a unique identifier
    ,
    __metadata("design:type", String)
], Entry.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Entry.prototype, "title", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Entry.prototype, "userId", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Entry.prototype, "description", void 0);
__decorate([
    Column({ type: "varchar", default: true }),
    __metadata("design:type", Boolean)
], Entry.prototype, "videoUrl", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Entry.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Entry.prototype, "updatedAt", void 0);
Entry = __decorate([
    Entity("entries") // The table name in the database
], Entry);
export { Entry };
//# sourceMappingURL=entry.js.map