export interface IConnection {
    id: string | undefined;
    created_date: string | undefined;
    modified_date: string | undefined;
    data: {
      user_uuid: string | undefined;
      achiev_uuid: string | undefined;
}

}
