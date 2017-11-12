import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarDetailComponent} from './star-detail/star-detail.component';
import {FolderListComponent} from './folder-list/folder-list.component';
import {FavouritesComponent} from './favourites/favourites.component';
import {FoldersComponent} from './folders/folders.component';
import {NavbarComponent} from './navbar/navbar.component';
import {
    MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
    MatListModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        MatInputModule,
        FormsModule
    ],
    declarations: [StarDetailComponent, FolderListComponent, FavouritesComponent, FoldersComponent, NavbarComponent],
    exports: [FavouritesComponent, FoldersComponent, NavbarComponent]
})
export class StarsModule {
}
