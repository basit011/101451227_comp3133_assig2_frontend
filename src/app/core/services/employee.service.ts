import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import {
  GET_ALL_EMPLOYEES,
  GET_EMPLOYEE_BY_ID,
  SEARCH_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from '../../graphql/employee.queries';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
 constructor(private apollo: Apollo) {}

  getAllEmployees() {
    return this.apollo.query({
      query: gql`
        query {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
      fetchPolicy: 'network-only' // Bypass cache
    });
  }

  getEmployeeById(id: string) {
    return this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { eid: id },
    });
  }

  searchEmployees(designation?: string, department?: string) {
    return this.apollo.query({
      query: SEARCH_EMPLOYEES,
      variables: { designation, department },
    });
  }

  // employee.service.ts
  addEmployee(employee: any) {
    const token = localStorage.getItem('token');

    return this.apollo
      .mutate({
        mutation: ADD_EMPLOYEE,
        variables: employee,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('GraphQL error:', error);
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((e: any) => {
              console.error('GraphQL error detail:', e);
            });
          }
          return throwError(() => error);
        })
      );
  }

  // updateEmployee(id: string, updates: any) {
  //   return this.apollo.mutate({
  //     mutation: UPDATE_EMPLOYEE,
  //     variables: { eid: id, ...updates },
  //   });
  // }

  // updateEmployee(id: string, updates: any) {
  //   const token = localStorage.getItem('token');

  //   // if (!token) {
  //   //   return throwError(() => new Error('No authentication token found'));
  //   // }

  //   return this.apollo
  //     .mutate({
  //       mutation: UPDATE_EMPLOYEE,
  //       variables: { eid: id, ...updates },
  //       context: {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     })
  //     .pipe(
  //       catchError((error) => {
  //         console.error('GraphQL error:', error);
  //         if (error.graphQLErrors) {
  //           error.graphQLErrors.forEach((e: any) => {
  //             console.error('GraphQL error detail:', e);
  //           });
  //         }
  //         return throwError(() => error);
  //       })
  //     );
  // }

  updateEmployee(id: string, updates: any) {
    const token = localStorage.getItem('token');

    return this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: { eid: id, ...updates },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      .pipe(
        map((response) => {
          if (!response.data) {
            throw new Error('No data received in response');
          }
          return response.data;
        }),
        catchError((error) => {
          console.error('Full GraphQL error:', JSON.stringify(error, null, 2));
          if (error.graphQLErrors) {
            error.graphQLErrors.forEach((e: any) => {
              console.error('GraphQL error detail:', {
                message: e.message,
                path: e.path,
                extensions: e.extensions,
              });
            });
          }
          return throwError(() => error);
        })
      );
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { eid: id },
    });
  }
}




