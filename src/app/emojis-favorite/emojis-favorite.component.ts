import { Component, OnInit } from '@angular/core';
import { Emoji } from '../emoji';
import { EmojiService } from '../emoji.service';

@Component({
  selector: 'app-emojis-favorite',
  templateUrl: './emojis-favorite.component.html',
  styleUrls: ['./emojis-favorite.component.css']
})
export class EmojisFavoriteComponent implements OnInit {
  title = 'любимые';
  displayedColumns: string[] = ['name', 'url', 'preview', 'actions'];
  emojisArray: Emoji[];
  preloaderVisible;

  constructor(private emojiService: EmojiService) { }


  ngOnInit() {
    this.getEmoji();
  }


  // Get list of emojis
  async getEmoji(): Promise<void> {
    this.preloaderVisible = true;
    await this.emojiService.getList('favorite')
      .then(data => {
        this.emojisArray = data;
        this.preloaderVisible = false;
      });
  }


  // Add emoji in list deleted
  delete(emoji: Emoji): void {
    this.emojisArray = this.emojisArray.filter(h => h !== emoji);
    this.emojiService.favorite(emoji.name);
  }


  // Search emoji in specified list of emojis
  async search(findStr: string): Promise<void> {
    await this.emojiService.searchEmojis('favorite', findStr)
    .then(data => this.emojisArray = data);
  }
}
