var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, BaseEntity, } from "typeorm";
import { Entry } from "./entry"; // Make sure you import the Entry entity
let Comment = class Comment extends BaseEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid") // Generates a unique identifier
    ,
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    Column({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => Entry, (entry) => entry.id) // Relationship with Entry
    ,
    JoinColumn({ name: "entryId" }) // This tells TypeORM to link this column to the Entry entity
    ,
    __metadata("design:type", Entry)
], Comment.prototype, "entry", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Comment.prototype, "updatedAt", void 0);
Comment = __decorate([
    Entity("comments") // The table name in the database
], Comment);
export { Comment };
//# sourceMappingURL=comment.js.map