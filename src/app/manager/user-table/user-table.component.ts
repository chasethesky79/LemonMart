import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {getFullName, IUsers, User} from '../../models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../user/user.service';
import {emailValidator, optionalTextValidator} from '../../utils/validations';
import {AbstractControl, FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { merge, of } from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.less'],
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
    users: User[];
    readonly displayedColumns = ['name', 'email', 'role', 'status'];
    readonly dataSource = new MatTableDataSource<AbstractControl>([]);
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    resultsLength = 0;
    isLoadingResults = true;
    hasError = false;
    errorText = '';
    skipLoading = false;
    search = new FormControl('', optionalTextValidator);
    rows: FormArray;
    userForm = this.fb.group({ users: this.rows });

    constructor(private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder,
                private cd: ChangeDetectorRef) {}

    ngOnInit(): void {
       const { user } = this.route.snapshot.data;
       this.buildControls([user]);
    }

    ngAfterViewInit(): void {
        if (!this.paginator || !this.sort) {
          return;
        }
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
            .subscribe((result: IUsers) => this.buildControls(result.items));
    }

    ngOnDestroy(): void {}

  /**
   * Method that builds array of form controls from user array.
   * @param users the array of users
   */
  private buildControls(users: User[]): void {
      this.rows = users.reduce((acc, val) => {
        acc.push(
          this.fb.group({
            name: [getFullName(val), Validators.required],
            id: val.id,
            email: [val.email, emailValidator],
            role: val.role,
            status: val.status
          })
        );
        return acc;
      }, this.fb.array([]));
      this.dataSource.data = this.rows.controls;
      this.cd.markForCheck();
    }
}
