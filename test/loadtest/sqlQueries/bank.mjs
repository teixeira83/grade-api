export default function createOneBank(uuid, iconId) {
  return `
  INSERT INTO public."Bank" (id,code,"sapCode","name","corporateName",cnpj,email,"mainPhone","alternatePhone","emailDomain",updated_at,created_at,removed,"userUpdaterId","userCreatorId","iconId",esg) VALUES
  ('${uuid}',1,2,'string','string','02967759000173','string@string.com','string','string','string','2022-12-06 22:50:57.946','2022-12-06 22:50:57.946',false,NULL,NULL,'${iconId}',false);`
}
