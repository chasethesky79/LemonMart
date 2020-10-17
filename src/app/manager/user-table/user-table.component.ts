import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IUsers, User } from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../user/user.service';
import { optionalTextValidator } from '../../utils/validations';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.less'],
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
    readonly displayedColumns = ['name', 'email', 'role', 'status', 'id'];
    readonly dataSource = new MatTableDataSource<User>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    resultsLength = 0;
    isLoadingResults = true;
    hasError = false;
    errorText = '';
    skipLoading = false;
    search = new FormControl('', optionalTextValidator);

    constructor(private userService: UserService) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        if (this.skipLoading) {
            return;
        }
        merge(this.sort.sortChange, this.paginator.page, this.search.valueChanges.pipe(debounceTime(1000)))
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.userService.getUsers(this.paginator.pageSize, this.search.value, this.paginator.pageIndex);
                }),
                map((result: IUsers) => {
                    this.isLoadingResults = false;
                    this.hasError = false;
                    this.resultsLength = result.total;
                    return result.items;
                }),
                catchError((err) => {
                    this.hasError = true;
                    this.isLoadingResults = false;
                    this.errorText = err;
                    return of({});
                })
            )
            .subscribe((result: IUsers) => (this.dataSource.data = result.items));
    }

    ngOnDestroy(): void {}
}
