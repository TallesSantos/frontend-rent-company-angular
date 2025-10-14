import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'div[app-comment-component]',
    imports: [CommonModule],
    templateUrl: './comment-component.html',
    styleUrl: './comment-component.css',
})
export class CommentComponent {
    @Input() level: number = 1;

    @Input() comment: CommentSchema | null = null;

    showChildrenComments = false;

    toggleChildrenComments() {
        this.showChildrenComments = !this.showChildrenComments;
    }


    get computedBgColor(): string {
        const bgColor = this.level % 2 != 0?"#DDD": "#FFF";
        return `${bgColor}`;
    }

    get computedWidth(): string {
        const margin = this.level+5;
        return `${margin}px`;
    }
}
