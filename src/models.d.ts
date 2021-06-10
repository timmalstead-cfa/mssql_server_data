import { Model, ModelCtor } from "sequelize"

export interface OrganizationModel extends Model {
  id: number
  name_english: string
  name_spanish: string
  website: string
  languages_spoken_english: string
  languages_spoken_spanish: string
  customers_served_english: string
  customers_served_spanish: string
  notes_english: string
  notes_spanish: string
  categories_english: string
  categories_spanish: string
  tags_english: string
  tags_spanish: string
}

export type Organization = ModelCtor<OrganizationModel>

export interface LocationsModel extends Model {
  id: number
  latitude: number
  longitude: number
  zip: number
  city: string
  name: string
  website: string
  address: string
  address_2: string
  state: string
  phone: string
  email: string
  notes: string
}

export type Location = ModelCtor<LocationsModel>

export interface ServiceModel extends Model {
  id: number
  name_english: string
  name_spanish: string
}

export type Service = ModelCtor<ServiceModel>

export interface SchedulesModel extends Model {
  id: number
  open_time: string
  close_time: string
  days: string
  notes: string
}

export type Schedule = ModelCtor<SchedulesModel>

export interface LocationsOrganizationsModel extends Model {
  locations_id: number
  organizations_id: number
}

export type LocationOrganization = ModelCtor<LocationsOrganizationsModel>

export interface SchedulesLocationsModel extends Model {
  schedules_id: number
  locations_id: number
}

export type ScheduleLocation = ModelCtor<SchedulesLocationsModel>

export interface SchedulesOrganizations extends Model {
  schedules_id: number
  organizations_id: number
}

export type ScheduleOrganization = ModelCtor<SchedulesOrganizations>

export interface ServicesLocations extends Model {
  services_id: number
  locations_id: number
}

export type ServiceLocation = ModelCtor<ServicesLocations>

export interface ServicesOrganizations extends Model {
  services_id: number
  organizations_id: number
}

export type ServiceOrganization = ModelCtor<ServicesOrganizations>

export type AllModels = [
  Organization,
  Location,
  Service,
  Schedule,
  LocationOrganization,
  ScheduleLocation,
  ScheduleOrganization,
  ServiceLocation,
  ServiceOrganization
]
