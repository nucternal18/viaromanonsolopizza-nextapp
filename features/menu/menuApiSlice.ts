import { createEntityAdapter } from "@reduxjs/toolkit";
import { menuApiSlice } from "@app/apiSlice";
import { MenuProps, MenuItemProps } from "@lib/types";

export const menuAdapter = createEntityAdapter<MenuProps>({});

export const menuApi = menuApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMenu: builder.query<Partial<MenuItemProps[]>, void>({
      query: () => "/menu/menu",
      providesTags: (result) =>
        result
          ? result.map((item) => ({
              type: "Menu" as const,
              id: item.id,
            }))
          : ["Menu"],
    }),
    getMenuByType: builder.query<
      Partial<MenuItemProps[]>,
      { sort: string; menuType: string }
    >({
      query: ({ sort, menuType }) =>
        `/menu?sort=${sort || "latest"}&menuType=${menuType || "antipasti"}`,
      providesTags: (result) =>
        result
          ? result.map((item) => ({
              type: "Menu" as const,
              id: item.id,
            }))
          : ["Menu"],
    }),
    addMenu: builder.mutation<
      { success: true; message: string },
      Partial<MenuItemProps>
    >({
      query: (body) => ({
        url: "/menu",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Menu"],
    }),
    updateMenu: builder.mutation<
      { success: true; message: string },
      { id: string; menuDetails: Partial<MenuItemProps> }
    >({
      query: ({ id, menuDetails }) => ({
        url: `/menu/${id}`,
        method: "PUT",
        body: { ...menuDetails },
      }),
      invalidatesTags: ["Menu"],
    }),
    deleteMenu: builder.mutation<{ success: true; message: string }, string>({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMenuQuery,
  useGetMenuByTypeQuery,
  useAddMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
} = menuApi;
